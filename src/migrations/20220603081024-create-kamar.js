'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kamars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_kamar:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      nm_kamar:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      idbangsal: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bangsals', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      harga: {
        type: Sequelize.DOUBLE
      },
      kelas: {
        type: Sequelize.TINYINT
      },
      stts_kamar: {
        type: Sequelize.TINYINT
      },
      isactive: {
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
    await queryInterface.dropTable('kamars');
  }
};