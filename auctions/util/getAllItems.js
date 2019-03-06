const db = require("../models");
const axios = require("axios");

module.exports = async function() {
  await db.Item.sync();

  //   db.Item.create({
  //     id: 3,
  //     properties: { test: "hello", "key 1": { "key inner": {} } }
  //   });

  saveItems = async () => {
    await db.Item.bulkCreate([
      {
        id: 1,
        properties: { test: "hello", "key 1": { "key inner": {} } }
      },
      {
        id: 2,
        properties: { test: "hello", "key 2": { "key inner": {} } }
      },
      {
        id: 3,
        properties: { test: "hello", "key 3": { "key inner": {} } }
      }
    ]);
  };

  getItems = async () => {
    let items = [];
    return await axios
      .get("https://www.raidbots.com/static/data/live/equippable-items.json")
      .then(result => {
        result.data.map(item => {
          const { id, ...rest } = item;
          db.Item.create({ id, properties: rest });
          //   items.push({ id: id, properties: rest });
        });
        // db.Item.bulkCreate(items).catch(err => console.log(err));
        // console.log(items);
      })
      .catch(err => console.log(err));
  };
  getItems();
};
