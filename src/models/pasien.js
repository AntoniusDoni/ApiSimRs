'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      pasien.hasMany(models.pesien_penjamins,{
        foreignKey: 'no_rm',
        otherKey:'no_rm'
      })
      pasien.hasMany(models.penanggung_jawab_pasiens,{
        foreignKey: 'no_rm',
        otherKey:'no_rm'
      })
      pasien.belongsTo(models.kelurahan,{
        foreignKey: 'id_kelurahan',
      });
    }
  }
  pasien.init({
    no_rm:{
      type:DataTypes.INTEGER,
      primaryKey: true 
    },
    nm_pasien: DataTypes.STRING,
    nik: DataTypes.STRING,
    alamat: DataTypes.STRING,
    ttgl_lahir: DataTypes.DATEONLY,
    jk: DataTypes.TINYINT,
    no_tlp: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    id_kelurahan: DataTypes.INTEGER,
    umur: DataTypes.STRING,
    sst_perkawinan: DataTypes.TINYINT,
    gol_darah: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    nm_ibu: DataTypes.STRING,
    is_active:DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'pasiens',
  });
  return pasien;
};