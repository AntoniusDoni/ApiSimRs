const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Poli=db.polis;

exports.addpoli = (req, res) => {
    Poli.create({
        kode_poli:req.body.kode_poli,
        nama_poli:req.body.nama_poli,
    }).then(poli=>{
        res.status(200).send({poli:poli,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistpoli = (req,res)=>{
    Poli.findAll({
        attributes:['kode_poli','nama_poli']
    }).then(poli=>{
        res.status(200).send(poli)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editpoli=(req,res)=>{
    Poli.update({
        kode_poli:req.body.kode_poli,
        nama_poli:req.body.nama_poli,
    },{
        where:{
            kode_poli:req.body.kode_poli
        }
    }).then(poli=>{
        res.status(200).send(poli)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletepoli = (req, res) => {
    const { id } = req.params;
    Poli.destroy({ where: { kode_poli: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

