const express = require("express");
const app = express();
const schedule = require("node-schedule");
const getCurrentlyAvailData = require("./util/getCurrentlyAvailableData");
const initStatus = require("./util/initInsertStatus");
const bodyParser = require("body-parser");
const auctions = require("./routes/v1/auctions");
const users = require("./routes/v1/users");
const headers = require("./middleware/headers");
const auth = require("./routes/v1/auth");
const db = require("./models");
const port = process.env.PORT || 3000;

const getCred = require("./util/getCredentials");

app.use(headers);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initStatus();
// db.sequelize.sync();

app.use("/api/v1/auth", auth);
app.use("/api/v1/auctions", auctions);
app.use("/api/v1/users", users);

// getCurrentlyAvailData();

// schedule.scheduleJob("*/5 * * * *", function() {
//   console.log("Scheduler running");
//   getCurrentlyAvailData();
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// getCred();
