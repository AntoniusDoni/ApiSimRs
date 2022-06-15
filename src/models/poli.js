'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class poli extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  poli.init({
    kode_poli: DataTypes.STRING,
    nama_poli: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'poli',
  });
  return poli;
};