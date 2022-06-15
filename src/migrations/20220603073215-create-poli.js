'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('polis', {
      
      kode_poli: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      nama_poli: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('polis');
  }
};