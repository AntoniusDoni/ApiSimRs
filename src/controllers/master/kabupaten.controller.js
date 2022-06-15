const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Kabupaten=db.kabupaten_kota;
const Provinsi=db.provinsis;

exports.addkabupaten = (req, res) => {
    Kabupaten.create({
        nm_kab:req.body.nm_kab,
        idprop:req.body.idprop
    }).then(kebupaten=>{
        res.status(200).send({kebupaten:kebupaten,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}

exports.getlistkabupaten = (req,res)=>{
    Kabupaten.findAll({
        include:[
            {
                model: Provinsi,
                require: true,
                attributes: ['nm_pro']
            },
        ]
    }
        
    ).then(kabupaten=>{
        res.status(200).send(kabupaten)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editkabupaten=(req,res)=>{
    Kabupaten.update({
        nm_kab:req.body.nm_kab,
        idprop:req.body.idprop
    },{
        where:{
            id:req.body.id
        }
    }).the(kebupaten=>{
        res.status(200).send(kebupaten)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletekabupaten = (req, res) => {
    const { id } = req.params;
    Kabupaten.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

