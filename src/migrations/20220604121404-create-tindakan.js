'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tindakans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_tindakan: {
        type: Sequelize.STRING
      },
      nm_tindakan: {
        type: Sequelize.STRING
      },
      biaya_dokter: {
        type: Sequelize.DOUBLE
      },
      jasa_rs: {
        type: Sequelize.DOUBLE
      },
      bhp: {
        type: Sequelize.DOUBLE
      },
      total_tarif: {
        type: Sequelize.DOUBLE
      },
      jns_tindakan: {
        type: Sequelize.TINYINT
      },
      kelas: {
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
    await queryInterface.dropTable('tindakans');
  }
};