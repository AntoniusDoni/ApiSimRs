'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kamar.belongsTo(models.bangsals,{
        foreignKey: 'idbangsal',
      });
    }
  }
  Kamar.init({
    kode_kamar:DataTypes.STRING,
    nm_kamar:DataTypes.STRING,
    idbangsal: DataTypes.INTEGER,
    harga: DataTypes.DOUBLE,
    kelas: DataTypes.TINYINT,
    stts_kamar: DataTypes.TINYINT,
    isactive: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'kamars',
  });
  return Kamar;
};