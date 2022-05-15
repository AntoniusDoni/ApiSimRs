'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseDetail.belongsTo(models.items,{
        foreignKey:'itemId'
      });
      PurchaseDetail.belongsTo(models.purchases,{
        foreignKey:'no_purchase',
        otherKey:'itemId'
      });
      // PurchaseDetail.belongsTo(models.stockies,{
      //   foreignKey:'no_purchase',
      // })
      // PurchaseDetail.hasMany(models.stockies,{
      //   foreignKey:'itemId',
      //   otherKey:'itemId'
      // // })
      // PurchaseDetail.belongsToMany(models.items, {
      //   through: "stockies",
      //   foreignKey: "itemId",
      //   otherKey: "no_po",
      // });
    }
  }
  PurchaseDetail.init({
    no_purchase: DataTypes.UUID,
    itemId: DataTypes.BIGINT,
    purchase_price: DataTypes.DOUBLE,
    quantity:DataTypes.DOUBLE,
    is_done:DataTypes.TINYINT,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'purchaseDetails',
  });
  return PurchaseDetail;
};