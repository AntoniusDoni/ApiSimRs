'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {   
      no_order: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      order_date: {
        type: Sequelize.DATE
      },
      customerName: {
        type: Sequelize.STRING
      },
      customer_phone: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT
      },
      totals: {
        type: Sequelize.DOUBLE
      },
      total_payment: {
        type: Sequelize.DOUBLE
      },
      UserID:{
        type:Sequelize.INTEGER
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
    await queryInterface.dropTable('Orders');
  }
};