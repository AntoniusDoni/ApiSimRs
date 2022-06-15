'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registrasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  registrasi.init({
    no_reg: DataTypes.STRING,
    no_rm: DataTypes.INTEGER,
    tgl_reg: DataTypes.DATE,
    kode_dokter: DataTypes.STRING,
    kode_poli: DataTypes.STRING,
    idiks: DataTypes.INTEGER,
    stts_daftar: DataTypes.TINYINT,
    stts_bayar: DataTypes.TINYINT,
    stts_rawat: DataTypes.TINYINT,
    stts_periksa: DataTypes.INTEGER,
    umurdaftar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'registrasi',
  });
  return registrasi;
};