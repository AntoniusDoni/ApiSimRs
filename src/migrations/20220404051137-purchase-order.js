'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {    
      no_po: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      supplierId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'suppliers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      order_date: {
        type: Sequelize.DATE
      },
      categoryId:{
        type: Sequelize.INTEGER
      },
      nama_apotek:{
        type: Sequelize.STRING
      },
      noSipa:{
        type:Sequelize.STRING
      },
      grand_total: {
        type: Sequelize.DOUBLE
      },
      is_done:{
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      purchase_date:{
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('purchase');
  }
};