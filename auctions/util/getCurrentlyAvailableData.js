const axios = require("axios");
const db = require("../models");
const getCreds = require("./getCredentials");
const getLatestTimestamp = require("./getLatestTimestamp");

module.exports = async function() {
  getDataFromSource = async (url, sourceLastUpdate) => {
    count = 0;
    data = [];

    try {
      const response = await axios.get(url);
      console.log("Fetching and saving auction");
      response.data.auctions.forEach(auction => {
        const {
          auc,
          item,
          owner,
          ownerRealm,
          bid,
          buyout,
          timeLeft,
          quantity,
          rand,
          seed,
          context,
          bonusLists,
          modifiers,
          petSpeciesId,
          petBreedId,
          petLevel,
          petQualityId
        } = auction;

        data.push({
          aucId: auc,
          itemId: item,
          owner: owner,
          ownerRealm,
          ownerRealm,
          bid: bid,
          buyout: buyout,
          timeLeft: timeLeft,
          quantity: quantity,
          batchTimeId: sourceLastUpdate,
          rand: rand,
          seed: seed,
          context: context,
          petSpeciesId: petSpeciesId,
          petBreedId: petBreedId,
          petLevel: petLevel,
          petQualityId: petQualityId,
          bonusLists: bonusLists,
          modifiers: modifiers
        });
        count++;

        if (count < 100) {
          db.Newest.bulkCreate(data, { raw: true });
          count = 0;
          data = [];
        }
      });
    } catch (err) {
      throw new Error(`Data fetch from API failed with error: ${err}`);
    }
  };

  try {
    await getCreds();

    const fetchUrl = `https://eu.api.blizzard.com/wow/auction/data/auchindoun?locale=en_US&access_token=${
      process.env.access_token
    }`;
    const prevUpdate = await getLatestTimestamp();
    console.log(prevUpdate);

    // Make sure tables are up
    await db.sequelize.sync();

    const response = await axios.get(fetchUrl);
    const responseUrl = response.data.files[0].url;
    const sourceLastUpdate = response.data.files[0].lastModified;

    console.log("From source, last modified: " + sourceLastUpdate);
    console.log(responseUrl);
    console.log(
      `prevDbEntry: ${prevUpdate} \nsourceLastUpdate: ${sourceLastUpdate}`
    );

    // Check if latest entry in database equals to new data, if not, save
    if (parseInt(prevUpdate) !== parseInt(sourceLastUpdate)) {
      console.log("Inserting from Newests to StandBys ");
      // Insert Newest to StandBys then drop and recreate Newest
      await db.sequelize.query(`INSERT INTO StandBies SELECT * FROM Newests`, {
        type: db.sequelize.QueryTypes.INSERT
      });

      //Signal database that insertion of new data is in progress
      console.log("Updating server status to 1");
      await db.InsertStatus.update({ inserting: 1 }, { where: { id: 1 } });
      // At this point Auctions route should fetch from StandBies instead of Newest

      console.log("Emptying Newest, keeping auto-incremented id primary key");
      db.Newest.destroy({
        where: {},
        truncate: false
      });

      // Find timestamp of previous StandBies
      const timeQuery = await db.sequelize.query(
        "SELECT MAX(batchTimeId) FROM StandBies where batchTimeId < (SELECT MAX(batchTimeId) from StandBies)",
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );
      const time = timeQuery[0]["MAX(batchTimeId)"];
      console.log(time);

      // Insert previous StandBies to History
      console.log("Inserting old StandBies to History");
      await db.sequelize.query(
        `INSERT INTO Histories SELECT * FROM StandBies where batchTimeId=${time}`,
        {
          type: db.sequelize.QueryTypes.INSERT
        }
      );

      // Get new data from source to Newest
      getDataFromSource(responseUrl, sourceLastUpdate);

      // Signal database that inserting is done
      // Auctions route should resume using Newest again.
      console.log("Setting server status to 0");
      await db.InsertStatus.update({ inserting: 0 }, { where: { id: 1 } });

      // Delete previous StandBies so that StandBies only have the previous Newest
      console.log("Deleting previous StandBies");
      await db.sequelize.query(
        `DELETE FROM StandBies where batchTimeId=${time}`,
        {
          type: db.sequelize.QueryTypes.DELETE
        }
      );
    } else {
      console.log("Source has no new data");
    }
  } catch (err) {
    console.log(err);
  }
};
