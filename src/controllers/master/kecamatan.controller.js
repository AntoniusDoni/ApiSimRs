const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Kabupaten=db.kabupaten_kota;
const Kecamatan=db.kecamatan;

exports.addkecamatan = (req, res) => {
    Kecamatan.create({
        nm_kec:req.body.nm_kec,
        idkab:req.body.idkab
    }).then(Kabupaten=>{
        res.status(200).send({kecamatan:kecamatan,nessage:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistkecamatan = (req,res)=>{
    Kecamatan.findAll({
        include:[
            {
                model: Kabupaten,
                require: true,
                attributes: ['nm_kab']
            },
        ]
    }
        
    ).then(kecamatan=>{
        res.status(200).send(kecamatan)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editkecamatan=(req,res)=>{
    Kecamatan.update({
        nm_kec:req.body.nm_kec,
        idkab:req.body.idkab
    },{
        where:{
            id:req.body.id
        }
    }).the(kecamatan=>{
        res.status(200).send(kecamatan)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletekecamatan = (req, res) => {
    const { id } = req.params;
    Kecamatan.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

