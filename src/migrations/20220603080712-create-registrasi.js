'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registrases', {
      no_reg: {
        allowNull: false,
        primaryKey: true,
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
      no_kartu:{
        type: Sequelize.STRING
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
    await queryInterface.dropTable('registrases');
  }
};