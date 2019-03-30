"use strict";
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    "History",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      aucId: DataTypes.BIGINT,
      itemId: DataTypes.BIGINT,
      owner: DataTypes.STRING,
      ownerRealm: DataTypes.STRING,
      bid: DataTypes.BIGINT,
      buyout: DataTypes.BIGINT,
      timeLeft: DataTypes.STRING,
      quantity: DataTypes.BIGINT,
      batchTimeId: DataTypes.BIGINT,
      rand: DataTypes.BIGINT,
      seed: DataTypes.BIGINT,
      context: DataTypes.BIGINT,
      bonusLists: { type: DataTypes.JSON, allowNull: true },
      modifiers: { type: DataTypes.JSON, allowNull: true },
      petSpeciesId: { type: DataTypes.BIGINT, allowNull: true },
      petBreedId: { type: DataTypes.BIGINT, allowNull: true },
      petLevel: { type: DataTypes.BIGINT, allowNull: true },
      petQualityId: { type: DataTypes.BIGINT, allowNull: true }
    },
    {}
  );
  History.associate = function(models) {};
  return History;
};
