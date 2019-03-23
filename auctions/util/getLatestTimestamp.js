const db = require("../models");

module.exports = async function() {
  try {
    const result = await db.sequelize.query(
      "SELECT MAX(batchTimeId) FROM Auctions",
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    return result[0]["MAX(batchTimeId)"];
  } catch (err) {
    throw Error(err);
  }
};
