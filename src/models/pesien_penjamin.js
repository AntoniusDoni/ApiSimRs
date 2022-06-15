'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesien_penjamin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pesien_penjamin.init({
    idks: DataTypes.INTEGER,
    no_kartu: DataTypes.STRING,
    no_rm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pesien_penjamin',
  });
  return pesien_penjamin;
};