'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tindakan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tindakan.init({
    kode_tindakan: DataTypes.STRING,
    nm_tindakan: DataTypes.STRING,
    biaya_dokter: DataTypes.DOUBLE,
    jasa_rs: DataTypes.DOUBLE,
    bhp: DataTypes.DOUBLE,
    total_tarif: DataTypes.DOUBLE,
    jns_tindakan: DataTypes.TINYINT,
    kelas: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'tindakan',
  });
  return tindakan;
};