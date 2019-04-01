const express = require("express");
const router = express.Router();
const db = require("../../models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];
const auth = require("../../middleware/auth");

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
      return res.send(
        "Username already registered. Please try a different username."
      );
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
  console.log(config);

  try {
    const result = await db.User.find({
      where: {
        username: { [Op.eq]: username }
      }
    });

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
      return res.json({ token });
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
  // Get data to be saved from request body, identity from decrypted token
  const { username, id } = req.body.decoded.payload;
  const { data } = req.body;
  try {
    const result = await db.Track.create({ UserId: id, owner: data });
    console.log(result);
    if (result) {
      res.status(201).send(`You are now tracking ${result.owner}`);
    }
  } catch (err) {
    console.log(err);
    if (err.errors[0].type === "unique violation") {
      res.status(500).send("You are already tracking this player");
    } else {
      res.status(500).send("Internal server error");
    }
  }

  // Save payload to tracked
});

module.exports = router;
