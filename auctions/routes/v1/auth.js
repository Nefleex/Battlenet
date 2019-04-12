const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/", auth, (req, res) => {
  res.status(200).send("Authentication succesful.");
});

module.exports = router;
