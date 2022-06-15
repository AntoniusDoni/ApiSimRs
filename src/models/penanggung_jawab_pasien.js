'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penanggung_jawab_pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  penanggung_jawab_pasien.init({
    no_rm: DataTypes.INTEGER,
    nm_penanggung: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    alamat: DataTypes.STRING,
    no_tlp: DataTypes.STRING,
    hub_pasien: DataTypes.STRING,
    no_ktp: DataTypes.STRING,
    id_kelurahan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'penanggung_jawab_pasien',
  });
  return penanggung_jawab_pasien;
};