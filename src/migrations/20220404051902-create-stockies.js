'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stockies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'warehouses', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      no_bact: {
        type: Sequelize.STRING
      },
      no_facture: {
        type: Sequelize.STRING
      },
      no_po: {
        type: Sequelize.STRING,
        references: {
          model: 'purchaseDetails', // name of Target model
          key: 'no_purchase', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      stock_in: {
        type: Sequelize.DOUBLE
      },
      date_in: {
        type: Sequelize.DATE
      },
      stock_out: {
        type: Sequelize.DOUBLE
      },
      date_out: {
        type: Sequelize.DATE
      },
      status_stock: {
        type: Sequelize.TINYINT
      },
      expirate_date: {
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
    await queryInterface.dropTable('stockies');
  }
};