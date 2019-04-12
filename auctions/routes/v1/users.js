const express = require("express");
const router = express.Router();
const db = require("../../models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];
const auth = require("../../middleware/auth");

const retrieveItemInfo = async val => {
  const result = await db.Item.find({
    where: { id: val },
    raw: true
  });
  return result;
};

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  try {
    const duplicate = await db.User.find(
      {
        where: { username: { [Op.eq]: username } }
      },
      { raw: true }
    );
    if (duplicate) {
      return res
        .status(400)
        .send("Username already registered. Please try a different username.");
    } else if (!duplicate) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log();
      console.log(hashedPassword);
      const creation = await db.User.create({
        username,
        password: hashedPassword
      });
      //User created with password hashed

      const plain = creation.get({ plain: true });
      const user = { username: plain.username, password: plain.password };
      console.log(user);
      return res
        .status(201)
        .send(`Account created with username ${user.username}`);
    }

    return res.send(`username: ${username}, password: ${password}`);
  } catch (err) {
    console.log(err);
    return res.send("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  let password = req.body.password;
  console.log(username);
  console.log(password);

  try {
    const result = await db.User.find({
      where: {
        username: { [Op.eq]: username }
      }
    });
    if (!result) {
      return res.status(400).send("Username or password invalid.");
    }

    const match = await bcrypt.compare(password, result.password);
    if (match) {
      // Add token here
      const secret = config.jwt_secret;
      const token = jwt.sign(
        {
          payload: {
            id: result.id,
            username: result.username,
            tracked: "FETCH USERS TRACKED OWNERS AND ITEMS HERE"
          }
        },
        secret,
        { expiresIn: "2h" }
      );
      return res.json({
        token,
        id: result.id,
        username: result.username
      });
    } else if (!match) {
      return res.status(400).send("Username or password invalid");
    }
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

router.post("/me", (req, res) => {});

// Tracking routes
// Add to tracking
router.post("/track", auth, async (req, res) => {
  try {
    // Get data to be saved from request body, identity from decrypted token

    const { username, id } = req.decoded.payload;
    const { data } = req.body;
    console.log(Array.isArray(data));
    if (!Array.isArray(data)) {
      const result = await db.Track.create({ UserId: id, owner: data });
      console.log(result);
      if (result) {
        res.status(201).send(`You are now tracking ${result.owner}`);
      } else {
        res.status(500).send("Tracking creation failed");
      }
    } else if (Array.isArray(data)) {
      // Check that none of owners in data are not tracked already
      const owners = data.map(o => {
        return { owner: o, UserId: id };
      });
      const duplicates = await db.Track.findAll({
        where: {
          [Op.or]: owners
        },
        raw: true
      });

      if (duplicates.length === 0) {
        // If no duplicates, format data into array for bulkCreate
        const owners = data.map(o => {
          return { owner: o, UserId: id };
        });
        console.log(owners);
        const result = await db.Track.bulkCreate(owners);
        console.log(result);
        const created = result.map(r => r.owner);
        return res.json({
          msg: `You are now tracking: ${created.map(c => c)}`,
          data: created
        });
      } else {
        // Duplicates found. Don't save any, respond with duplicate owners
        res.status(400).json({
          msg: `You are already tracking these player(s): ${duplicates.map(
            o => o.owner
          )}`
        });
      }

      res.send(result);
    } else {
      res
        .status(500)
        .send("Internal server error. Could not determine datatype ");
    }
  } catch (err) {
    console.log(err);

    if (err.errors[0].type === "unique violation") {
      res
        .status(500)
        .send(`You are already tracking this player: ${err.errors[0].value}`);
    } else {
      res.status(500).send("Internal server error");
    }
  }
});

// Get all user's tracked auction owners
router.get("/track", auth, async (req, res) => {
  const { username, id } = req.decoded.payload;
  try {
    const tracking = await db.Track.findAll({
      where: { UserId: id },
      raw: true
    });
    const owners = tracking.map(item => {
      return item.owner;
    });
    console.log(owners);
    res.send(owners);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// Delete specified owners from tracking
// Returns remaining tracked owners
router.delete("/track", auth, async (req, res) => {
  try {
    const { username, id } = req.decoded.payload;
    const { data } = req.body;
    if (data.length === 0) return res.send("No data to delete");
    // Await until all Tracks are destroyed before finding remaining ones and sending them as a response.
    const deleted = [];
    await Promise.all(
      data.map(async d => {
        const deletedItem = await db.Track.destroy({
          where: {
            owner: d,
            UserId: id
          }
        });
        // If item was destroyed, promise resolves to 1, else 0. Track which Tracks were destroyed
        if (deletedItem === 1) deleted.push(d);
      })
    );
    console.log(deleted);

    const tracking = await db.Track.findAll({
      where: {
        UserId: id
      },
      raw: true
    });
    const owners = tracking.map(item => {
      console.log(item);
      return item.owner;
    });
    return res.send({ deleted, owners });
  } catch (err) {
    console.log("Error:");
    console.log(err);
    res.status(500).send("Internal server error.");
  }
});

// Get all owners with auctions posted
router.get("/track/auctions", auth, async (req, res) => {
  try {
    const { id } = req.decoded.payload;
    const userData = await db.Track.findAll({
      where: { UserId: id },
      raw: true
    });
    console.log(userData);

    // Map owners into array
    const owners = userData.map(o => {
      return o.owner;
    });
    console.log(owners);

    // Find auction entries for each owner
    const tracked = Promise.all(
      owners.map(async owner => {
        const ownerAuctions = await db.Newest.findAll({
          where: { owner },
          raw: true
        });
        // For each auction that owner has, match item data for that auction
        const auctions = await Promise.all(
          ownerAuctions.map(async auction => {
            const itemInfo = await retrieveItemInfo(auction.itemId);
            return { ...auction, itemName: itemInfo.name, data: itemInfo };
          })
        );

        return { owner, auctions: auctions };
      })
    );
    const result = await tracked;
    // const result = raw.filter(el => {
    //   if (el === null) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    if (result.length === 0) {
      return res.status(404).send(result);
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
