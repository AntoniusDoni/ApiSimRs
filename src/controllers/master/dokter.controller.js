const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Dokter=db.dokters;

exports.adddokter = (req, res) => {
    Dokter.create({
        kode_dokter:req.body.kode_dokter,
        nm_dokter:req.body.nm_dokter,
        jk:req.body.jk,
        tgl_lahir:req.body.tgl_lahir,
        gol_darah:req.body.gol_darah,
        alamat:req.body.alamat,
        no_tlp:req.body.no_tlp,
        status_doktor:req.body.status_doktor,
        no_ijin:req.body.no_ijin,
        kd_sp:req.body.kd_sp,
    }).then(dokter=>{
        res.status(200).send({dokter:dokter,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistdokter = (req,res)=>{
    Dokter.findAll().then(dokter=>{
        res.status(200).send(dokter)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editdokter=(req,res)=>{
    Dokter.update({
        kode_dokter:req.body.kode_dokter,
        nm_dokter:req.body.nm_dokter,
        jk:req.body.jk,
        tgl_lahir:req.body.tgl_lahir,
        gol_darah:req.body.gol_darah,
        alamat:req.body.alamat,
        no_tlp:req.body.no_tlp,
        status_doktor:req.body.status_doktor,
        no_ijin:req.body.no_ijin,
        kd_sp:req.body.kd_sp,
    },{
        where:{
            kode_dokter:req.body.kode_dokter
        }
    }).the(dokter=>{
        res.status(200).send(dokter)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletedokter = (req, res) => {
    const { id } = req.params;
    Dokter.destroy({ where: { kode_dokter: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

