const axios = require("axios");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

module.exports = async function() {
  let url = `https://eu.battle.net/oauth/token?client_id=${
    config.client_id
  }&client_secret=${config.client_secret}&grant_type=client_credentials`;

  return axios
    .get(url)
    .then(res => {
      //   console.log(res.data.access_token);
      process.env.access_token = res.data.access_token;
      console.log(
        `Access token has been to in environment variables: ${
          process.env.access_token
        }`
      );
    })
    .catch(err => {
      console.log(err);
      throw new Error("access_token acquisition failed.");
    });
};
