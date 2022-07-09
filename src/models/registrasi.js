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
      registrasi.belongsTo(models.pasiens,{
        foreignKey: 'no_rm',
      });
      registrasi.belongsTo(models.dokters,{
        foreignKey: 'kode_dokter',
      });
      registrasi.belongsTo(models.polis,{
        foreignKey: 'kode_poli',
      });
    }
  }
  registrasi.init({
    no_reg: {
      type:DataTypes.STRING,
      primaryKey: true 
    },
    no_rm: DataTypes.INTEGER,
    tgl_reg: DataTypes.DATEONLY,
    kode_dokter: DataTypes.STRING,
    kode_poli: DataTypes.STRING,
    idiks: DataTypes.INTEGER,
    no_kartu: DataTypes.STRING,
    stts_daftar: DataTypes.TINYINT,
    stts_bayar: DataTypes.TINYINT,
    stts_rawat: DataTypes.TINYINT,
    stts_periksa: DataTypes.INTEGER,
    umurdaftar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'registrases',
  });
  return registrasi;
};