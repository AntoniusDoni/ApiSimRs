'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Warehouse.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true 
      },
    warehouse_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'warehouse',
  });
  return Warehouse;
};