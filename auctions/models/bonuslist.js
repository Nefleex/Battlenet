"use strict";
module.exports = (sequelize, DataTypes) => {
  const BonusList = sequelize.define(
    "BonusList",
    {
      bonusListId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  BonusList.associate = function(models) {
    // associations can be defined here
    BonusList.belongsTo(models.Auction, {
      foreignKey: "aucId"
    });
  };
  return BonusList;
};
