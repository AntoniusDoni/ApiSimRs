'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goodReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goodReceipt.init({
    no_fa: DataTypes.STRING,
    no_po:DataTypes.DOUBLE,
    date_in: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER,
    grand_total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'goodReceipt',
  });
  return goodReceipt;
};