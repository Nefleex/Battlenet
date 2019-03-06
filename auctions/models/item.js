"use strict";
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define(
    "Item",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true },
      name: DataTypes.STRING,
      properties: DataTypes.JSON
    },
    {}
  );
  item.associate = function(models) {
    // associations can be defined here
  };
  return item;
};
