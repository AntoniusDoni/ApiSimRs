'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('racikans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor_r: {
        type: Sequelize.STRING
      },
      nama_racikan: {
        type: Sequelize.STRING
      },
      jml: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      },
      no_order: {
        type: Sequelize.UUID,
        references: {
          model: 'Orders', // name of Target model
          key: 'no_order', // key in Target model that we're referencing
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('racikans');
  }
};