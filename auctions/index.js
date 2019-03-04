const express = require("express");
const schedule = require("node-schedule");
const app = express();
const getCurrentlyAvailData = require("./util/getCurrentlyAvailableData");
const bodyParser = require("body-parser");
const auctions = require("./routes/v1/auctions");
const db = require("./models");
require("./util/yyyymmdd")();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/api/v1/auctions", auctions);

// getCurrentlyAvailData();

// schedule.scheduleJob("* /5 * * * *", function() {
//   console.log("Scheduler running");
//   getCurrentlyAvailData();
// });

// app.listen("3000", () => {
//   console.log("Listening in port 3000.");
// });

// db.Auction.findAll()
//   .then(result => {
//     // console.log(result);
//     result.map(item => {
//       console.log(item);
//     });
//   })
//   .catch(err => console.log(err));
