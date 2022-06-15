'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dokters', {
    
      kode_dokter: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nm_dokter: {
        type: Sequelize.STRING
      },
      jk: {
        type: Sequelize.TINYINT
      },
      tgl_lahir: {
        type: Sequelize.DATE
      },
      gol_darah: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_ijin: {
        type: Sequelize.STRING
      },
      status_doktor: {
        type: Sequelize.STRING
      },
      kd_sp: {
        type: Sequelize.INTEGER
      },
      no_tlp: {
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
    await queryInterface.dropTable('dokters');
  }
};