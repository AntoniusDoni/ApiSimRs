const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Dokter=db.dokters;
const Jadwal=db.jadwals;
const Poli=db.polis;
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
exports.adddokter = (req, res) => {
    const birthdate=formatDate(req.body.tgl_lahir);
    // console.log(birthdate);
    Dokter.create({
        kode_dokter:req.body.kode_dokter,
        nm_dokter:req.body.nm_dokter,
        jk:req.body.jk,
        tgl_lahir:birthdate,
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
exports.getlistdokterbypolijadwal = (req,res)=>{
    Dokter.findAll({
        include: [
            {
                model: Jadwal,
                required: true,
                where: {
                    hari: req.body.hari,
                    // jam_selesai: {
                    //     [Op.lt]: req.body.jam
                    // }
                },
                attributes: [],
                include: [
                    {
                        model: Poli,
                        required: true,
                        where: {kode_poli:req.body.kode_poli}
                    }
                ]
            }
        ],
        attributes:['kode_dokter','nm_dokter']
    }).then(dokter=>{
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
    }).then(dokter=>{
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

