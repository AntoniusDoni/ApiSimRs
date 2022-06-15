'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchaseDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_purchase: {
        type: Sequelize.STRING,
        references:{
          model:'purchases',
          key:'no_po'
        },
        
      },
      itemId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'items', // name of Target model
          key: 'id_items', // key in Target model that we're referencing
        },
      
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      margin: {
        type: Sequelize.STRING
      },
      purchase_price: {
        type: Sequelize.DOUBLE
      },
      items_sell: {
        type: Sequelize.DOUBLE
      },
      is_done:{
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchaseDetails');
  }
};