'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kabupaten_kota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kabupaten_kota.belongsTo(models.provinsi,{
        foreignKey: 'idprop',
      });
    }
  }
  kabupaten_kota.init({
    nm_kab: DataTypes.STRING,
    idprop: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kabupaten_kota',
  });
  return kabupaten_kota;
};