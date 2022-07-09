const db =  require("../../models");
const { sequelize } = require("../../models");
const { Op } = require("sequelize");
const Kelurahan=db.kelurahan;
const Kecamatan=db.kecamatan;

exports.addkelurahan = (req, res) => {
    Kelurahan.create({
        nm_kel:req.body.nm_kel,
        idkec:req.body.idkec
    }).then(kelurahan=>{
        res.status(200).send({kelurahan:kelurahan,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistkelurahan = (req,res)=>{
    Kelurahan.findAll({
        include:[
            {
                model: Kecamatan,
                require: true,
                attributes: ['nm_kec']
            },
        ]
    }
        
    ).then(kelurahan=>{
        res.status(200).send(kelurahan)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistkelurahanbyidkec = (req,res)=>{
    Kelurahan.findAll({
        where:{idkec:req.body.idkec}
        ,attributes:['id','nm_kel']
    }
        
    ).then(kelurahan=>{
        res.status(200).send(kelurahan)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editkelurahan=(req,res)=>{
    Kelurahan.update({
        nm_kel:req.body.nm_kel,
        idkec:req.body.idkec
    },{
        where:{
            id:req.body.id
        }
    }).then(kelurahan=>{
        res.status(200).send(kelurahan)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletekelurahan = (req, res) => {
    const { id } = req.params;
    Kelurahan.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}