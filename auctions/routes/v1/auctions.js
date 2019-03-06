const express = require("express");
const router = express.Router();
const db = require("../../models");

// example
// http://localhost:3000/api/v1/auctions/?name=Worn_shortsword
router.get("/", async (req, res) => {
  console.log("Received");

  let latestTimestamp;
  let resultId;

  const name = req.query.name.trim();
  console.log(name);

  // Find Item with query's name
  try {
    const result = await db.Item.find({
      where: { name: { $like: `%${name}%` } }
    });

    if (!result) {
      return res.send("Couldn't find item by that name");
    } else {
      console.log("result's id :");
      console.log(result.id);
      resultId = result.id;
    }
  } catch (err) {
    return res.send("Couldn't find item by that name");
  }

  try {
    const result = await db.Auction.findAll({
      where: { itemId: resultId }
    });
    return res.send(result);
  } catch (err) {
    return res.status(501).send("Internal server error");
  }
});

module.exports = router;
