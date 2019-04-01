const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

module.exports = function(req, res, next) {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        // Attach verified and decoded token payload to request body
        req.body.decoded = decoded;
        next();
      }
    });
  }
};
