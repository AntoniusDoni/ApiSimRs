const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Tindakan=db.tindakans;
exports.addTindakan = (req, res) => {
    Tindakan.create({
        kode_tindakan: req.body.kode_tindakan,
        nm_tindakan: req.body.nm_tindakan,
        biaya_dokter: req.body.biaya_dokter,
        jasa_rs:req.body.jasa_rs,
        bhp: req.body.bhp,
        total_tarif: parseFloat(req.body.biaya_dokter)+parseFloat(req.body.jasa_rs)+parseFloat(req.body.bhp),
        jns_tindakan: req.body.jns_tindakan,
        kelas: req.body.kelas,
    }).then(Tindakan=>{
        res.status(200).send({Tindakan:Tindakan,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistTindakan = (req,res)=>{
    Tindakan.findAll(
    ).then(Tindakan=>{
        res.status(200).send(Tindakan)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editTindakan=(req,res)=>{
    Tindakan.update({
        kode_tindakan: req.body.kode_tindakan,
        nm_tindakan: req.body.nm_tindakan,
        biaya_dokter: req.body.biaya_dokter,
        jasa_rs:req.body.jasa_rs,
        bhp: req.body.bhp,
        total_tarif: parseFloat(req.body.biaya_dokter)+parseFloat(req.body.jasa_rs)+parseFloat(req.body.bhp),
        jns_tindakan: req.body.jns_tindakan,
        kelas: req.body.kelas,
    },{
        where:{
            id:req.body.id
        }
    }).then(Tindakan=>{
        res.status(200).send(Tindakan)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deleteTindakan = (req, res) => {
    const { id } = req.params;
    Tindakan.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

