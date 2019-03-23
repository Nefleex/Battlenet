const getLatestTimestamp = require("./getLatestTimestamp");
const db = require("../models");

module.exports = async limit => {
  try {
    let maxItems;
    const latestTimestamp = await getLatestTimestamp();
    if (!limit) {
      maxItems = await db.sequelize.query(
        `SELECT itemId, sum(quantity) quantity from Auctions WHERE batchTimeId="${latestTimestamp}" group by itemId order by quantity desc`,
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );
      return maxItems;
    } else if (limit) {
      maxItems = await db.sequelize.query(
        `SELECT itemId, sum(quantity) quantity from Auctions WHERE batchTimeId="${latestTimestamp}" group by itemId order by quantity desc limit ${limit}`,
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );
      return maxItems;
    }
  } catch (err) {
    throw Error(err);
  }
};
