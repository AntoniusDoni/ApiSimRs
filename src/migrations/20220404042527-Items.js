'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id_items: {
        type: Sequelize.BIGINT ,
        autoIncrement: true,
        primaryKey: true
      },
      item_code: {
        type: Sequelize.STRING
      },
      items_name: {
        type: Sequelize.STRING
      },
      items_price: {
        type: Sequelize.DOUBLE
      },
      
      items_content: {
        type: Sequelize.DOUBLE
      },
      unitId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'units', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      categoryId:{
        type:Sequelize.INTEGER,
        references: {
          model: 'categories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      content_unit:{
        type: Sequelize.INTEGER,
        references: {
          model: 'units', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('items');
  }
};
