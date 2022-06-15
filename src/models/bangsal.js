'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bangsal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bangsal.init({
    
    kode_bangsal:{
      type:DataTypes.STRING,
      primaryKey: true,
      
      },
    nm_bangsal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bangsals',
  });
  return Bangsal;
};