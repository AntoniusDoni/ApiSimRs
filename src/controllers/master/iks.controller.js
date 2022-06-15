const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const IKS=db.IKs;
const Penjamin=db.penjamins;
exports.addiks = (req, res) => {
    IKS.create({
        nama_perusahaan:req.body.nama_perusahaan,
        alamat:req.body.alamat,
        no_tlp:req.body.no_tlp,
        no_kontrak:req.body.no_kontrak,
        tgl_mulai:req.body.no_kontrak,
        tgl_selesai:req.body.no_kontrak,
        idpenjamin:req.body.idpenjamin
    }).then(iks=>{
        res.status(200).send({iks:iks,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistiks = (req,res)=>{
    IKS.findAll({
        include:[
            {
            model: Penjamin,
            require: true,
            attributes: ['nm_penjamin']
            }
        ]
        
    }
    ).then(penjamin=>{
        res.status(200).send(iks)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editiks=(req,res)=>{
    IKS.update({
        nama_perusahaan:req.body.nama_perusahaan,
        alamat:req.body.alamat,
        no_tlp:req.body.no_tlp,
        no_kontrak:req.body.no_kontrak,
        tgl_mulai:req.body.no_kontrak,
        tgl_selesai:req.body.no_kontrak,
        idpenjamin:req.body.idpenjamin
    },{
        where:{
            id:req.body.idpenjamin
        }
    }).the(penjamin=>{
        res.status(200).send(iks)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deleteiks = (req, res) => {
    const { id } = req.params;
    IKS.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

