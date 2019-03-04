const Sequelize = require("sequelize");

sequelize = new Sequelize("", "root", "password", {
  host: "localhost",
  dialect: "mysql"
});

// Connect to database
sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL Database!"))
  .catch(err => console.log(err));

// Create database if it doesn't exist
sequelize
  .query("CREATE DATABASE IF NOT EXISTS `auctions_database`;")
  //   .then(response => console.log(response))
  .catch(err => console.log(err));

sequelize = new Sequelize("auctions_database", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 100000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL Database!"))
  .catch(err => console.log(err));

module.exports = sequelize;

//Create auctions table
