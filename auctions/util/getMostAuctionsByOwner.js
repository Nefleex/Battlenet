const getLatestTimestamp = require("./getLatestTimestamp");
const db = require("../models");

module.exports = async limit => {
  try {
    let maxItems;
    const latestTimestamp = await getLatestTimestamp();
    if (!limit) {
      maxItems = await db.sequelize.query(
        // OWNER NAME????????????????????????
        // `SELECT a.itemId, SUM(a.quantity), a.owner, i.name FROM Auctions AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id GROUP BY a.owner ORDER BY SUM(a.quantity) desc`,
        `SELECT sum(quantity) as quantity, owner FROM Auctions WHERE batchTimeId="${latestTimestamp}" GROUP BY owner ORDER BY quantity DESC`,
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );
      return maxItems;
    } else if (limit) {
      maxItems = await db.sequelize.query(
        `SELECT sum(quantity) as quantity, owner FROM Auctions WHERE batchTimeId="${latestTimestamp}" GROUP BY owner ORDER BY quantity DESC LIMIT ${limit}`,
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
