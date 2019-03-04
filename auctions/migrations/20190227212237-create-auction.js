"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Auctions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aucId: { type: Sequelize.BIGINT },
      item_id: {
        type: Sequelize.BIGINT
      },
      owner: {
        type: Sequelize.STRING
      },
      ownerRealm: {
        type: Sequelize.STRING
      },
      bid: {
        type: Sequelize.BIGINT
      },
      buyout: {
        type: Sequelize.BIGINT
      },
      timeLeft: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.BIGINT
      },
      batchTimeId: {
        type: Sequelize.BIGINT
      },
      rand: {
        type: Sequelize.BIGINT
      },
      seed: {
        type: Sequelize.BIGINT
      },
      context: {
        type: Sequelize.BIGINT
      },
      petSpeciesId: {
        type: Sequelize.BIGINT
      },
      petBreedId: {
        type: Sequelize.BIGINT
      },
      petLevel: {
        type: Sequelize.BIGINT
      },
      petQualityId: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Auctions");
  }
};
