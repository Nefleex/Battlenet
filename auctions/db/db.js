const Sequelize = require("sequelize");
const Auction = require("../models/auction");

let sequelize;
Auction.sync();

initDb = () => {};

module.exports.initDb = initDb;
module.exports.sequelize = sequelize;
