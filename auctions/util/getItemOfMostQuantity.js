const getLatestTimestamp = require("./getLatestTimestamp");
const db = require("../models");

module.exports = async (status, limit, latestTimestamp) => {
  try {
    let maxItems;
    if (status === 0) {
      if (!limit) {
        maxItems = await db.sequelize.query(
          `SELECT a.itemId, sum(a.quantity) as quantity, i.name FROM Newests AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id GROUP BY a.itemId ORDER BY quantity DESC`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return maxItems;
      } else if (limit) {
        maxItems = await db.sequelize.query(
          `SELECT a.itemId, SUM(a.quantity) as quantity, i.name FROM Newests AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id GROUP BY a.itemId ORDER BY quantity DESC LIMIT ${limit}`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return maxItems;
      }
    } else {
      if (!limit) {
        maxItems = await db.sequelize.query(
          `SELECT a.itemId, sum(a.quantity) as quantity, i.name FROM StandBys AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id GROUP BY a.itemId ORDER BY quantity DESC`,
          {
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        return maxItems;
      } else if (limit) {
        maxItems = await db.sequelize.query(
          `SELECT a.itemId, SUM(a.quantity) as quantity, i.name FROM StandBys AS a, Items AS i WHERE batchTimeId="${latestTimestamp}" and a.itemId=i.id GROUP BY a.itemId ORDER BY quantity DESC LIMIT ${limit}`,
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

// db.sequelize.query(
//   `SELECT a.itemId, sum(a.quantity) a.quantity, i.name
// from Auctions a, Items i
// WHERE batchTimeId="${latestTimestamp}"
// and a.itemId=i.itemId
// group by a.itemId order by a.quantity desc limit ${limit}`,
//   {
//     type: db.sequelize.QueryTypes.SELECT
//   }
// );
