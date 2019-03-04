const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/", (req, res) => {
  db.Auction.findAll()
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

module.exports = router;
