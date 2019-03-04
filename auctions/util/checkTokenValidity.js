const axios = require("axios");
getCred = require("./getCredentials");

module.exports = function() {
  let url = `https://eu.api.blizzard.com/wow/auction/data/auchindoun?locale=en_US&access_token=${
    process.env.access_token
  }`;
  //
};
