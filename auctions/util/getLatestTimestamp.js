const db = require("../models");

module.exports = async function() {
  const result = await db.sequelize.query(
    "SELECT MAX(batchTimeId) FROM Auctions",
    {
      type: db.sequelize.QueryTypes.SELECT
    }
  );
  //   console.log("batchTime:");
  //   console.log(result[0]["MAX(batchTimeId)"]);

  return result[0]["MAX(batchTimeId)"];

  // .then(result => {
  //   prevUpdate = awaitresult[0]["MAX(batchTimeId)"];
  //   console.log("batchTime:" + result[0]["MAX(batchTimeId)"]);
  //   return result;
  // })
  // .catch(err => console.log(err));
};
