'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registrasis', {
      no_reg: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      no_rm: {
        type: Sequelize.INTEGER
      },
      tgl_reg: {
        type: Sequelize.DATE
      },
      kode_dokter: {
        type: Sequelize.STRING,
        references: {
          model: 'dokters', 
          key: 'kode_dokter', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      kode_poli: {
        type: Sequelize.STRING,
        references: {
          model: 'polis', 
          key: 'kode_poli', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      idiks: {
        type: Sequelize.INTEGER,
        references: {
          model: 'IKs', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      stts_daftar: {
        type: Sequelize.TINYINT
      },
      stts_bayar: {
        type: Sequelize.TINYINT
      },
      stts_rawat: {
        type: Sequelize.TINYINT
      },
      stts_periksa: {
        type: Sequelize.INTEGER
      },
      umurdaftar: {
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
    await queryInterface.dropTable('registrasis');
  }
};