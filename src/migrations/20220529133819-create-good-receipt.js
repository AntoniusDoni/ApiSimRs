'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goodReceipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_fa: {
        type: Sequelize.STRING
      },
      no_po: {
        type: Sequelize.STRING
      },
      date_in: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER
      },
      grand_total: {
        type: Sequelize.DOUBLE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('goodReceipts');
  }
};