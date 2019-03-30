const db = require("../models");
const checkStatus = require("./checkInsertStatus");

module.exports = async function() {
  try {
    const status = await checkStatus();
    await db.Newest.sync();
    await db.StandBy.sync();
    let result;
    switch (status) {
      case 0:
        result = await db.sequelize.query(
          "SELECT MAX(batchTimeId) FROM Newests",
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return result[0]["MAX(batchTimeId)"];
      case 1:
        result = await db.sequelize.query(
          "SELECT MAX(batchTimeId) FROM StandBys",
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return result[0]["MAX(batchTimeId)"];
    }
  } catch (err) {
    throw Error(err);
  }
};
