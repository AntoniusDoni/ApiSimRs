'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchase.belongsTo(models.supplier,{
        foreignKey: 'supplierId',
      });
      Purchase.belongsToMany(models.items, {
        through: "purchaseDetails",
        foreignKey: "no_purchase",
        otherKey: "itemId"
      });
     
    }
  }
  Purchase.init({
    no_po: {
      type:DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true 
    },
    supplierId: DataTypes.INTEGER,
    purchase_date: DataTypes.DATE,
    grand_total: DataTypes.DOUBLE,
    is_done:DataTypes.TINYINT,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'purchases',
  });
  return Purchase;
};