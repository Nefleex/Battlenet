const db = require("../models");

module.exports = async function() {
  try {
    const result = await db.InsertStatus.find({
      where: { id: 1 },
      raw: true
    });

    return result.inserting;
  } catch (err) {
    throw Error(err);
  }
};
