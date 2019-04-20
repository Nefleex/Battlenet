const getLatestTimestamp = require("./getLatestTimestamp");
const db = require("../models");

module.exports = async (status, limit, latestTimestamp) => {
  try {
    let maxItems;
    if (status === 0) {
      if (!limit) {
        maxItems = await db.sequelize.query(
          // OWNER NAME????????????????????????
          // `SELECT a.itemId, SUM(a.quantity), a.owner, i.name FROM Auctions AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id GROUP BY a.owner ORDER BY SUM(a.quantity) desc`,
          `SELECT sum(quantity) as quantity, owner FROM Newests WHERE batchTimeId="${latestTimestamp}" GROUP BY owner ORDER BY quantity DESC`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return maxItems;
      } else if (limit) {
        maxItems = await db.sequelize.query(
          `SELECT sum(quantity) as quantity, owner FROM Newests WHERE batchTimeId="${latestTimestamp}" GROUP BY owner ORDER BY quantity DESC LIMIT ${limit}`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return maxItems;
      }
    } else {
      if (!limit) {
        maxItems = await db.sequelize.query(
          // OWNER NAME????????????????????????
          // `SELECT a.itemId, SUM(a.quantity), a.owner, i.name FROM Auctions AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id GROUP BY a.owner ORDER BY SUM(a.quantity) desc`,
          `SELECT sum(quantity) as quantity, owner FROM StandBies WHERE batchTimeId="${latestTimestamp}" GROUP BY owner ORDER BY quantity DESC`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return maxItems;
      } else if (limit) {
        maxItems = await db.sequelize.query(
          `SELECT sum(quantity) as quantity, owner FROM StandBies WHERE batchTimeId="${latestTimestamp}" GROUP BY owner ORDER BY quantity DESC LIMIT ${limit}`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return maxItems;
      }
    }
  } catch (err) {
    throw Error(err);
  }
};
