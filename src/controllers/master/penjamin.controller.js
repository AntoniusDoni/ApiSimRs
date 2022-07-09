const db =  require("../../models");
const { sequelize } = require("../../models");
const { Op } = require("sequelize");
const Penjamin=db.penjamins;

exports.addpenjamin = (req, res) => {
    Penjamin.create({
        nama_penjab:req.body.nama_penjab,
    }).then(penjamin=>{
        res.status(200).send({penjamin:penjamin,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistpenjamin = (req,res)=>{
    Penjamin.findAll().then(penjamin=>{
        res.status(200).send(penjamin)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editpenjamin=(req,res)=>{
    Penjamin.update({
        nama_penjab:req.body.nama_penjab,
    },{
        where:{
            id:req.body.id
        }
    }).then(penjamin=>{
        res.status(200).send(penjamin)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletepenjamin = (req, res) => {
    const { id } = req.params;
    Penjamin.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

