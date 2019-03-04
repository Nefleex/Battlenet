const express = require("express");
const schedule = require("node-schedule");
const app = express();
const getCurrentlyAvailData = require("./util/getCurrentlyAvailableData");
require("./util/yyyymmdd")();
const db = require("./models");
const axios = require("axios");

// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/config/config.json")[env];

schedule.scheduleJob("* /5 * * * *", function() {
  console.log("Scheduler running");
  getCurrentlyAvailData();
});
