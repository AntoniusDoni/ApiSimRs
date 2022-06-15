'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Racikans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Racikans.belongsToMany(models.items, {
        through: "OrderDetails",
        foreignKey: "idRacik",
        otherKey: "itemsId"
      });
    }
  }
  Racikans.init({
    nomor_r: DataTypes.STRING,
    nama_racikan: DataTypes.STRING,
    jml: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    no_order: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'racikans',
  });
  return Racikans;
};