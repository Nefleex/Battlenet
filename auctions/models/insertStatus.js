"use strict";
module.exports = (sequelize, DataTypes) => {
  const InsertStatus = sequelize.define(
    "InsertStatus",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      inserting: DataTypes.INTEGER
    },
    {}
  );
  InsertStatus.associate = function(models) {};
  return InsertStatus;
};
