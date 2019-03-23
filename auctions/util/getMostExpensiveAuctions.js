const getLatestTimestamp = require("./getLatestTimestamp");
const db = require("../models");

module.exports = async limit => {
  try {
    if (limit) {
      const latestTimestamp = await getLatestTimestamp();
      const items = await db.sequelize.query(
        `SELECT itemId, buyout from Auctions where batchTimeId="${latestTimestamp}"  order by buyout desc limit ${limit}`,
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );

      return items;
    } else if (!limit) {
      const latestTimestamp = await getLatestTimestamp();
      const items = await db.sequelize.query(
        `SELECT itemId, buyout from Auctions where batchTimeId="${latestTimestamp}"  order by buyout desc`,
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );

      return items;
    }
  } catch (err) {
    throw Error(err);
  }
};
