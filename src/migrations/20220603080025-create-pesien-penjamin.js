'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pesien_penjamins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idks: {
        type: Sequelize.INTEGER,
        references: {
          model: 'IKs', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      no_kartu: {
        type: Sequelize.STRING
      },
      no_rm: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pasiens', 
          key: 'no_rm', 
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
    await queryInterface.dropTable('pesien_penjamins');
  }
};