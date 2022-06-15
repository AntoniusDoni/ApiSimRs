'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pasien.init({
    no_rm: DataTypes.INTEGER,
    nm_pasien: DataTypes.STRING,
    nik: DataTypes.STRING,
    alamat: DataTypes.STRING,
    ttgl_lahir: DataTypes.DATE,
    jk: DataTypes.TINYINT,
    no_tlp: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    id_kelurahan: DataTypes.INTEGER,
    umur: DataTypes.STRING,
    sst_perkawinan: DataTypes.TINYINT,
    gol_darah: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    nm_ibu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pasien',
  });
  return pasien;
};