const csv = require("fast-csv");
const db = require("../auctions/models");

const readFile = () => {
  db.Item.sync();
  let items = [];

  // insert 100 items at a time
  const createItems = async data => {
    if (items.length < 100) {
      items.push(data);
    }
    if (items.length >= 100) {
      db.Item.bulkCreate(items)
        .then(() => console.log("items saved"))
        .catch(err => console.log(err));
      items = [];
    }
  };
  return csv
    .fromPath("./ItemSparse.csv", {
      headers: true,
      //   quote: "\\",
      escape: "\\",
      discardUnmappedColumns: true
    })
    .on("data", async function(data) {
      const { id, name, ...rest } = data;
      let item = { id, name, properties: rest };
      // console.log(name);
      createItems(item);
    })
    .on("end", function() {
      console.log("done");
      db.Item.bulkCreate(items)
        .then(() => console.log("items saved"))
        .catch(err => console.log(err));
    });
};

//db.Item.create({ id, name, properties: rest });

// console.log(db.sequelize);
readFile();
