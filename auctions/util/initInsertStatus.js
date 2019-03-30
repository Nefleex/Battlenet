const db = require("../models");

module.exports = async () => {
  try {
    await db.InsertStatus.sync({ force: true });
    return await db.InsertStatus.create({ inserting: 0 });
  } catch (error) {
    return console.log(error);
  }
};
