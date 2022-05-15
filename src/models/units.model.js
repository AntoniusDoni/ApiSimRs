'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Units.hasOne(models.items,{
        foreignKey:'unitId'
      });
    }
  }
  Units.init({
    id:{
    type:DataTypes.INTEGER,
    primaryKey: true 
    },
    unit_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'units',
  });
    return Units;
  };