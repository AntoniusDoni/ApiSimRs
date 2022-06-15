'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pasiens', {
      no_rm: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nm_pasien: {
        type: Sequelize.STRING
      },
      nik: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      ttgl_lahir: {
        type: Sequelize.DATE
      },
      jk: {
        type: Sequelize.TINYINT
      },
      no_tlp: {
        type: Sequelize.STRING
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      id_kelurahan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'kelurahans', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      umur: {
        type: Sequelize.STRING
      },
      sst_perkawinan: {
        type: Sequelize.TINYINT
      },
      gol_darah: {
        type: Sequelize.STRING
      },
      pekerjaan: {
        type: Sequelize.STRING
      },
      nm_ibu: {
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
    await queryInterface.dropTable('pasiens');
  }
};