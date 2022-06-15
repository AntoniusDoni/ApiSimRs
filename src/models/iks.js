'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IKS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IKS.belongsTo(models.penjamin,{
        foreignKey: 'idpenjamin',
      });
    }
  }
  IKS.init({
    nama_perusahaan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_tlp: DataTypes.STRING,
    no_kontrak: DataTypes.STRING,
    tgl_mulai: DataTypes.DATE,
    tgl_selesai: DataTypes.DATE,
    idpenjamin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IKS',
  });
  return IKS;
};