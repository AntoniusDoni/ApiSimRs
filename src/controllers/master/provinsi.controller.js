const db = require("../../models");
// const { sequelize } = require('../models');
const { Op } = require("sequelize");
const Provinsi=db.provinsi;

exports.addprovinsi = (req, res) => {
    Provinsi.create({
        nm_pro:req.body.nm_pro
    }).then(provinsi=>{
        res.status(200).send({provinsi:provinsi,nessage:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistprovinsi = (req,res)=>{
    Provinsi.findAll().then(provinsi=>{
        res.status(200).send(provinsi)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editprovinsi=(req,res)=>{
    Provinsi.update({
        nm_pro:req.body.nm_pro
    },{
        where:{
            id:req.body.idprovinsi
        }
    }).the(provinsi=>{
        res.status(200).send(provinsi)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deleteprovinsi = (req, res) => {
    const { id } = req.params;
    Provinsi.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

