"use strict";
module.exports = (sequelize, DataTypes) => {
  const Modifier = sequelize.define(
    "Modifier",
    {
      type: { type: DataTypes.INTEGER, allowNull: false },
      value: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  Modifier.associate = function(models) {
    // associations can be defined here
    Modifier.belongsTo(models.Auction, {
      foreignKey: "aucId"
    });
  };
  return Modifier;
};
