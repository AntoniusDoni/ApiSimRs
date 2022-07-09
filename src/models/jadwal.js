'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jadwal.belongsTo(models.dokters,{
        foreignKey: 'kd_dokter',
      });
      Jadwal.belongsTo(models.polis,{
        foreignKey: 'kd_poli',
      });
    }
  }
  Jadwal.init({
    kd_dokter: DataTypes.STRING,
    hari: DataTypes.STRING,
    jam_mulai: DataTypes.TIME,
    jam_selesai: DataTypes.TIME,
    kd_poli: DataTypes.STRING,
    kuota: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jadwals',
  });
  return Jadwal;
};