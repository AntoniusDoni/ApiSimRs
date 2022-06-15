'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penanggung_jawab_pasiens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      nm_penanggung: {
        type: Sequelize.STRING
      },
      tgl_lahir: {
        type: Sequelize.DATE
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_tlp: {
        type: Sequelize.STRING
      },
      hub_pasien: {
        type: Sequelize.STRING
      },
      no_ktp: {
        type: Sequelize.STRING
      },
      id_kelurahan: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('penanggung_jawab_pasiens');
  }
};