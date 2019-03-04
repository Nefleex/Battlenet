"use strict";
module.exports = (sequelize, DataTypes) => {
  const CreationId = sequelize.define(
    "CreationId",
    {
      creation_id: DataTypes.BIGINT
    },
    {}
  );
  CreationId.associate = function(models) {
    // associations can be defined here
    // CreationId.belongsTo
  };
  return CreationId;
};
