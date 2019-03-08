const express = require("express");
const router = express.Router();
const db = require("../../models");
const getLatestTimestamp = require("../../util/getLatestTimestamp");

// Route for getting auctions from latest scan by an item name. Returns an array as a result
// http://localhost:3000/api/v1/auctions/by_name/?name=Example_Item_Name
router.get("/by_name/", async (req, res) => {
  console.log("Received");

  let resultId;
  let latestTimestamp;
  const name = req.query.name.trim();
  console.log(name);
  console.log(latestTimestamp);

  try {
    latestTimestamp = await getLatestTimestamp();
  } catch (err) {
    console.log(err);
    return res.status(501).send("Internal server error");
  }

  // Find Item with query's name
  try {
    const result = await db.Item.find({
      where: { name: { $like: `%${name}%` } }
    });

    if (!result) {
      return res.status(404).send("Couldn't find item by that name");
    } else {
      console.log("result's id :");
      console.log(result.id);
      resultId = result.id;
    }
  } catch (err) {
    return res.status(404).send("Couldn't find item by that name");
  }

  try {
    const result = await db.Auction.findAll({
      where: { itemId: resultId, batchTimeId: latestTimestamp }
    });
    console.log("Result: ");
    console.log(result);

    return res.send(result);
  } catch (err) {
    return res.status(501).send("Internal server error");
  }
});

// Route for getting auctions from latest scan by an owner name. Returns an array as a result
// http://localhost:3000/api/v1/auctions/by_name/?name=Example_Item_Name
router.get("/by_owner/", async (req, res) => {
  const latestTimestamp = await getLatestTimestamp();
  const owner = req.query.owner;

  try {
    const result = await db.Auction.findAll({
      where: { owner, batchTimeId: latestTimestamp }
    });
    console.log("Result: ");
    console.log(result);

    if (!result) {
      return res.status(404).send("Couldn't find item by that owner name");
    } else {
      return res.send(result);
    }
  } catch (err) {
    return res.status(404).send("Internal server error");
  }
});

module.exports = router;
