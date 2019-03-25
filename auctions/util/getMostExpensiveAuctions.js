const getLatestTimestamp = require("./getLatestTimestamp");
const db = require("../models");

module.exports = async limit => {
  try {
    if (limit) {
      const latestTimestamp = await getLatestTimestamp();
      const items = await db.sequelize.query(
        `SELECT a.itemId, a.buyout, i.name FROM Auctions AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id ORDER BY buyout DESC LIMIT ${limit}`,
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );

      return items;
    } else if (!limit) {
      const latestTimestamp = await getLatestTimestamp();
      const items = await db.sequelize.query(
        `SELECT a.itemId, a.buyout, i.name FROM Auctions AS a, Items AS i WHERE batchTimeId="${latestTimestamp}"  ORDER BY buyout DESC`,
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
