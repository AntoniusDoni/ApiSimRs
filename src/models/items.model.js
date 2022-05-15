'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.units,{
        foreignKey: 'unitId',
      });
      Items.belongsTo(models.categories,{
        foreignKey: 'categoryId',
      });
      Items.belongsTo(models.stockies,{
        foreignKey: 'id_items',
      });
      
    }
  }
  Items.init({
    id_items:{
    type:DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true 
    },
    item_code: DataTypes.STRING,
    items_name:DataTypes.STRING,
    items_price:DataTypes.DOUBLE,
    items_content:DataTypes.DOUBLE,
    unitId:DataTypes.INTEGER,
    categoryId:DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'items',
  });
    return Items;
  };