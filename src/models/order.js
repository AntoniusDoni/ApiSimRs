'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsToMany(models.items, {
        through: "OrderDetails",
        foreignKey: "orderId",
        otherKey: "itemsId"
      });
    }
  }
  Order.init({
    no_order:{
      type:DataTypes.UUID,
      primaryKey: true 
    } ,
    order_date: DataTypes.DATE,
    customerName: DataTypes.STRING,
    customer_phone: DataTypes.STRING,
    status: DataTypes.TINYINT,
    totals: DataTypes.DOUBLE,
    total_payment:DataTypes.DOUBLE,
    UserID:DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};