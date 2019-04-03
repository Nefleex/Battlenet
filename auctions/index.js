const express = require("express");
const schedule = require("node-schedule");
const app = express();
const getCurrentlyAvailData = require("./util/getCurrentlyAvailableData");
const initStatus = require("./util/initInsertStatus");
const bodyParser = require("body-parser");
const auctions = require("./routes/v1/auctions");
const users = require("./routes/v1/users");
const headers = require("./middleware/headers");
const db = require("./models");
require("./util/yyyymmdd")();

const getCred = require("./util/getCredentials");

app.use(headers);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initStatus();

app.use("/api/v1/auctions", auctions);
app.use("/api/v1/users", users);

// getCurrentlyAvailData();

// schedule.scheduleJob("*/5 * * * *", function() {
//   console.log("Scheduler running");
//   getCurrentlyAvailData();
// });

app.listen("3000", () => {
  console.log("Listening in port 3000.");
});

// getCred();
