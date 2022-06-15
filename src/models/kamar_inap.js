'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kamar_inap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kamar_inap.init({
    no_reg: DataTypes.STRING,
    no_rm: DataTypes.INTEGER,
    kode_kamar: DataTypes.STRING,
    tgl_masuk: DataTypes.DATE,
    tgl_keluar: DataTypes.DATE,
    jm_hari: DataTypes.INTEGER,
    tarif_hari: DataTypes.DOUBLE,
    total_tarif: DataTypes.DOUBLE,
    stts_rawat: DataTypes.TINYINT,
    kelas_kamar: DataTypes.TINYINT,
    istitip: DataTypes.TINYINT,
    sst_bayar: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'kamar_inap',
  });
  return kamar_inap;
};