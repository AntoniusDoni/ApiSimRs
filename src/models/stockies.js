'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stockies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stockies.hasMany(models.items,{
        foreignKey:'itemId'
      });
      Stockies.belongsTo(models.purchaseDetails,{
        foreignKey:'itemId',
        otherKey:'no_po'
      });
    }
  }
  Stockies.init({
    warehouse_id: DataTypes.INTEGER,
    itemId: {
      type:DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true 
      },
    no_bact: DataTypes.STRING,
    no_facture: DataTypes.STRING,
    margin: DataTypes.STRING,
    stock_in: DataTypes.DOUBLE,
    expirate_date:DataTypes.DATE,
    date_in: DataTypes.DATE,
    items_price:DataTypes.DOUBLE,
    stock_out: DataTypes.DOUBLE,
    date_out: DataTypes.DATE,
    items_sell:DataTypes.DOUBLE,
    no_po:DataTypes.STRING,
    status_stock: DataTypes.TINYINT,
    createdAt: new Date(),
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'stockies',
  });
  return Stockies;
};