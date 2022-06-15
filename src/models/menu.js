'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      menus.hasMany(models.menus,{
        as: 'child',
        foreignKey: 'parent',
      });
      // menus.belongsTo(models.user_menu,{
      //   foreignKey: 'id',
      // });
    }
  }
  menus.init({
    menuName: DataTypes.STRING,
    link: DataTypes.STRING,
    parent:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menus',
  });
  return menus;
};