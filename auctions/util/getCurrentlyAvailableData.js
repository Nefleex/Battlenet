const axios = require("axios");
const db = require("../models");
const getCreds = require("./getCredentials");

module.exports = async function() {
  getDb = async () => {
    await db.Auction.findAll({
      attributes: [
        db.sequelize.fn("MAX", db.sequelize.col("batchTimeId")),
        "batchTimeId"
      ]
    })
      .then(result => {
        prevUpdate = result[0].dataValues.batchTimeId;
        console.log("Latest batchTimeId: " + prevUpdate);
        // console.log(prevUpdate);
      })
      .catch(err => console.log(err));
  };

  try {
    getCreds().then(() => {
      let fetchUrl = `https://eu.api.blizzard.com/wow/auction/data/auchindoun?locale=en_US&access_token=${
        process.env.access_token
      }`;
      let responseUrl = null;
      let sourceLastUpdate;
      let prevUpdate;

      db.Auction.sync();
      db.Modifier.sync();
      db.BonusList.sync();
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
          if (prevUpdate !== sourceLastUpdate) {
            axios
              .get(responseUrl)
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
                        include: [
                          { model: db.Modifier },
                          { model: db.BonusList }
                        ]
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
              .catch(err => console.log(err));
          } else {
            console.log("Source has no new data");
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.status);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

// Example input
// db.Auction.create(
//   {
//     aucId: 123123,
//     itemId: 123123123,
//     owner: "asdasdasd",
//     ownerRealm: "seeee",
//     bid: 123123123,
//     buyout: 123123123,
//     timeLeft: 123123123,
//     quantity: 111,
//     rand: 0,
//     seed: 0,
//     context: 0,
//     batchTimeId: 1,
//     petSpeciesId: 123,
//     petBreedId: 123,
//     petLevel: 123,
//     petQualityId: 123,
//     BonusLists: [{ bonusListId: 2 }, { bonusListId: 3 }, { bonusListId: 4 }],
//     Modifiers: [{ type: 2, value: 3 }]
//   },
//   {
//     include: [{ model: db.Modifier }, { model: db.BonusList }]
//   }
// );

// db.Auction.sync();
// db.Modifier.sync();
// db.BonusList.sync();
// db.Auction.create(
//   {
//     aucId: 123123,
//     itemId: 123123123,
//     owner: "asdasdasd",
//     ownerRealm: "seeee",
//     bid: 123123123,
//     buyout: 123123123,
//     timeLeft: 123123123,
//     quantity: 111,
//     rand: 0,
//     seed: 0,
//     context: 0,
//     batchTimeId: 1,
//     petSpeciesId: 123,
//     petBreedId: 123,
//     petLevel: 123,
//     petQualityId: 123,
//     BonusLists: [{ bonusListId: 2 }, { bonusListId: 3 }, { bonusListId: 4 }],
//     Modifiers: [{ type: 2, value: 3 }]
//   },
//   {
//     include: [{ model: db.Modifier }, { model: db.BonusList }]
//   }
// );

// let fetchUrl =
//   "https://eu.api.blizzard.com/wow/auction/data/auchindoun?locale=en_US&access_token=USt8YZr7C3aWNF7q040dffacqshMRSuxr7";

// let responseUrl;
// let sourceLastUpdate;
// axios
//   .get(fetchUrl)
//   .then(response => {
//     responseUrl = response.data.files[0].url;
//     sourceLastUpdate = response.data.files[0].lastModified;
//     console.log("From source, last modified: " + sourceLastUpdate);
//   })
//   .then(() => {
//     console.log(responseUrl);

//     axios
//       .get(responseUrl)
//       .then(response => {
//         console.log("Fetching and saving auction");
//         response.data.auctions.forEach(auction => {
//           console.log(auction);
//         });
//       })
//       .catch(err => console.log(err));
//   });
