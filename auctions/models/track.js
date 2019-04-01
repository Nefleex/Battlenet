"use strict";
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define("Track", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    owner: { type: DataTypes.STRING, unique: true }
  });
  Track.associate = function(models) {
    // associations can be defined here
    Track.belongsTo(models.User, {
      through: { model: models.User }
    });
  };
  return Track;
};
