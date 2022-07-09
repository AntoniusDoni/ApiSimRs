const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const IKS=db.iks;
const Penjamin=db.penjamins;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
exports.addiks = (req, res) => {
    IKS.create({
        nama_perusahaan:req.body.nama_perusahaan,
        alamat:req.body.alamat,
        no_tlp:req.body.no_tlp,
        no_kontrak:req.body.no_kontrak,
        tgl_mulai:formatDate(req.body.tgl_mulai),
        tgl_selesai:formatDate(req.body.tgl_selesai),
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
            attributes: ['nama_penjab']
            }
        ]       
    }
    ).then(iks=>{
        res.status(200).send(iks)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistiksByIdPenjamin = (req,res)=>{
    IKS.findAll({
        where:{idpenjamin:req.body.idpenjamin},
        attributes:['id','nama_perusahaan']       
    }
    ).then(iks=>{
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
        tgl_mulai:formatDate(req.body.tgl_mulai),
        tgl_selesai:formatDate(req.body.tgl_selesai),
        idpenjamin:req.body.idpenjamin
    },{
        where:{
            id:req.body.idpenjamin
        }
    }).then(iks=>{
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

