const db = require("../models");
const axios = require("axios");

module.exports = async function() {
  await db.Item.sync();

  getItems = async () => {
    let items = [];
    return await axios
      .get("https://www.raidbots.com/static/data/live/equippable-items.json")
      .then(result => {
        result.data.map(item => {
          const { id, name, ...rest } = item;
          db.Item.create({ id, name, properties: rest });
          //   items.push({ id: id, properties: rest });
        });
        // db.Item.bulkCreate(items).catch(err => console.log(err));
        // console.log(items);
        console.log("Done getting fetching and saving");
      })
      .catch(err => console.log(err));
  };
  getItems();
};
