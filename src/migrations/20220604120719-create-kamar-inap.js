'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kamar_inaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_reg: {
        type: Sequelize.STRING
      },
      no_rm: {
        type: Sequelize.INTEGER
      },
      kode_kamar: {
        type: Sequelize.STRING
      },
      tgl_masuk: {
        type: Sequelize.DATE
      },
      tgl_keluar: {
        type: Sequelize.DATE
      },
      jm_hari: {
        type: Sequelize.INTEGER
      },
      tarif_hari: {
        type: Sequelize.DOUBLE
      },
      total_tarif: {
        type: Sequelize.DOUBLE
      },
      stts_rawat: {
        type: Sequelize.TINYINT
      },
      kelas_kamar: {
        type: Sequelize.TINYINT
      },
      istitip: {
        type: Sequelize.TINYINT
      },
      sst_bayar: {
        type: Sequelize.TINYINT
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
    await queryInterface.dropTable('kamar_inaps');
  }
};