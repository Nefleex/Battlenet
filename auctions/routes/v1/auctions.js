const express = require("express");
const router = express.Router();
const db = require("../../models");
const getLatestTimestamp = require("../../util/getLatestTimestamp");
const getMaxQtyItems = require("../../util/getItemOfMostQuantity");
const getMostExpAuc = require("../../util/getMostExpensiveAuctions");
const getMostAucByOwner = require("../../util/getMostAuctionsByOwner");

// Get Item name for id
const retrieveItemInfo = async val => {
  const result = await db.Item.find({
    where: { id: val },
    raw: true
  });
  return result;
};

// Route for getting auctions from latest scan by an item name. Returns an array as a result
// http://localhost:3000/api/v1/auctions/by_item/?item=Example_Item_Name
router.get("/by_item/", async (req, res) => {
  console.log("Received");

  let resultId;
  let resultName;
  let latestTimestamp;
  const item = req.query.item;

  try {
    latestTimestamp = await getLatestTimestamp();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }

  // Find Item with query's name
  try {
    const result = await db.Item.find({
      where: { name: { $like: `%${item}%` } }
    });
    debugger;
    if (!result || result.length === 0) {
      return res.status(404).send("No results for that item");
    } else {
      console.log("result's id :");
      console.log(result.id);
      console.log(result.name);
      resultId = result.id;
      resultName = result.name;
    }
  } catch (err) {
    return res.status(404).send("Couldn't find item by that name");
  }

  try {
    const result = await db.Auction.findAll({
      where: { itemId: resultId, batchTimeId: latestTimestamp },
      raw: true
    });
    console.log("Result: ");

    resultFinal = result.map(auction => {
      // Cut off decimals, convert to string to be able to slice on front end
      let unitPrice = Math.trunc(auction.buyout / auction.quantity).toString();
      return { ...auction, unitPrice };
    });
    if (!resultFinal || resultFinal === 0) {
      return res.status(404).send("No results for that item");
    } else {
      return res.json({ auctions: resultFinal, extra: resultName });
    }
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

// Route for getting auctions from latest scan by an owner name. Returns an array as a result
// http://localhost:3000/api/v1/auctions/by_name/?name=Example_Item_Name
router.get("/by_owner/", async (req, res) => {
  let latestTimestamp;
  const owner = req.query.owner;
  try {
    latestTimestamp = await getLatestTimestamp();
  } catch (err) {
    console.log(err);
    return res.status(501).send("Internal server error");
  }

  try {
    const result = await db.Auction.findAll({
      where: { owner, batchTimeId: latestTimestamp },
      raw: true
    });

    resultWithItemName = Promise.all(
      result.map(async auction => {
        let itemInfo = await retrieveItemInfo(auction.itemId);
        itemName = itemInfo.name;

        // Cut off decimals, convert to string to be able to slice on front end
        let unitPrice = Math.trunc(
          auction.buyout / auction.quantity
        ).toString();
        return { ...auction, unitPrice, itemName: itemName, data: itemInfo };
      })
    );
    resultFinal = await resultWithItemName;
    console.log(resultFinal);

    if (!resultFinal || resultFinal.length === 0) {
      return res.status(404).send("Couldn't find item by that owner name");
    } else {
      return res.json({ auctions: resultFinal, extra: owner });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

router.get("/max/", async (req, res) => {
  const owner = req.query.owner;
  const maxPriceOfItem = req.query.price;
  const maxAmountOfItem = req.query.amount;
  const limit = req.query.limit;
  console.log(``);

  try {
    // select itemId, sum(quantity) q from auctions.auctions where batchTimeID="1553151645000"  group by itemId order by q desc
    if (maxAmountOfItem) {
      const result = await getMaxQtyItems(limit);
      console.log(result);
      res.send(result);
    }
    if (maxPriceOfItem) {
      const result = await getMostExpAuc(limit);
      console.log(result);
      res.send(result);
    }
    if (owner) {
      const result = await getMostAucByOwner(limit);
      console.log(result);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error 500");
  }
});

module.exports = router;
