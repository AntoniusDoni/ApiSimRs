'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kelurahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kelurahan.belongsTo(models.kecamatan,{
        foreignKey: 'idkec',
      });
    }
  }
  kelurahan.init({
    nm_kel: DataTypes.STRING,
    idkec: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kelurahan',
  });
  return kelurahan;
};