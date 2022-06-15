const db = require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Bangsal=db.bangsals;

exports.addbangsal = (req, res) => {
    Bangsal.create({
        kode_bangsal:req.body.kode_bangsal,
        nm_bangsal:req.body.nm_bangsal,
    }).then(bangsal=>{
        res.status(200).send({bangsal:bangsal,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistbangsal = (req,res)=>{
    Bangsal.findAll().then(bangsal=>{
        res.status(200).send(bangsal)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editbangsal=(req,res)=>{
    Bangsal.update({
      
        nm_bangsal:req.body.nm_bangsal,
    },{
        where:{
            kode_bangsal:req.body.kode_bangsal
        }
    }).the(bangsal=>{
        res.status(200).send(bangsal)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletebangsal = (req, res) => {
    const { id } = req.params;
    Bangsal.destroy({ where: { kode_bangsal: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

