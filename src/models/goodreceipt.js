'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goodreceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Goodreceipt.init({
    no_fa: DataTypes.STRING,
    no_po:DataTypes.STRING,
    date_in: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    grand_total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'goodreceipts',
  });
  return Goodreceipt;
};