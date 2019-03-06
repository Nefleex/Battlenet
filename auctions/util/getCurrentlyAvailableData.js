const axios = require("axios");
const db = require("../models");
const getCreds = require("./getCredentials");

module.exports = async function() {
  let prevUpdate;

  getData = async (url, sourceLastUpdate) => {
    try {
      await axios
        .get(url)
        .then(response => {
          console.log("Fetching and saving auction");
          response.data.auctions.forEach(auction => {
            // console.log(auction);
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

            if (modifiers && bonusLists) {
              db.Auction.create(
                {
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
                  BonusLists: bonusLists,
                  Modifiers: auction.modifiers
                },
                {
                  include: [{ model: db.Modifier }, { model: db.BonusList }]
                }
              );
            }
            if (modifiers && !bonusLists) {
              db.Auction.create(
                {
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
                  Modifiers: auction.modifiers
                },
                {
                  include: [{ model: db.Modifier }]
                }
              );
            }
            if (!modifiers && bonusLists) {
              db.Auction.create(
                {
                  audId: auc,
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
                  BonusLists: bonusLists
                },
                {
                  include: [{ model: db.BonusList }]
                }
              );
            }
            if (!modifiers && !bonusLists) {
              db.Auction.create({
                audId: auc,
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
                petQualityId: petQualityId
              });
            }
          });
        })
        .catch(err => {
          throw new Error(`Data fetch from API failed with error: ${err}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // get UNIX timestamp of previous update from database
  getDb = async () => {
    await db.sequelize
      .query("SELECT MAX(batchTimeId) FROM Auctions", {
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(result => {
        prevUpdate = result[0]["MAX(batchTimeId)"];
        console.log(result[0]["MAX(batchTimeId)"]);
      })
      .catch(err => console.log(err));
  };

  getCreds()
    .then(async () => {
      let fetchUrl = `https://eu.api.blizzard.com/wow/auction/data/auchindoun?locale=en_US&access_token=${
        process.env.access_token
      }`;
      let responseUrl = null;
      let sourceLastUpdate;

      await db.Auction.sync();
      await db.Modifier.sync();
      await db.BonusList.sync();
      console.log("before GetDb");
      getDb();

      return axios
        .get(fetchUrl)
        .then(response => {
          responseUrl = response.data.files[0].url;
          sourceLastUpdate = response.data.files[0].lastModified;
          console.log("From source, last modified: " + sourceLastUpdate);
        })
        .then(() => {
          console.log(responseUrl);

          console.log(
            `prevDbEntry: ${prevUpdate} \nsourceLastUpdate: ${sourceLastUpdate}`
          );

          // Check if latest entry in database equals to new data, if not, save
          if (parseInt(prevUpdate) !== parseInt(sourceLastUpdate)) {
            getData(responseUrl, sourceLastUpdate);
          } else {
            console.log("Source has no new data");
          }
        });
    })
    .catch(err => console.log(err));
};
