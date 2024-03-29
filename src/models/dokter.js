'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dokter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dokter.hasMany(models.jadwals,{
        foreignKey: 'kd_dokter',
      });
    }
  }
  dokter.init({
    kode_dokter: {
      type:DataTypes.STRING,
      primaryKey: true 
    },
    nm_dokter: DataTypes.STRING,
    jk: DataTypes.TINYINT,
    tgl_lahir: DataTypes.DATE,
    gol_darah: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_ijin: DataTypes.STRING,
    status_doktor: DataTypes.STRING,
    kd_sp: DataTypes.INTEGER,
    no_tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dokters',
  });
  return dokter;
};