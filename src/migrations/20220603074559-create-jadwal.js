'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jadwals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kd_dokter: {
        type: Sequelize.STRING,
        references: {
          model: 'dokters', 
          key: 'kode_dokter',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      hari: {
        type: Sequelize.STRING
      },
      jam_mulai: {
        type: Sequelize.TIME
      },
      jam_selesai: {
        type: Sequelize.TIME
      },
      kd_poli: {
        type: Sequelize.STRING,
        references: {
          model: 'polis', 
          key: 'kode_poli',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      kuota: {
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
    await queryInterface.dropTable('jadwals');
  }
};