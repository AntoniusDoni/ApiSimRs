const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Jadwal=db.jadwals;
const Dokter=db.dokters;
const Poli=db.polis;
exports.addjadwal = (req, res) => {
    Jadwal.create({
        kd_dokter:req.body.kd_dokter,
        hari:req.body.hari,
        jam_mulai:req.body.jam_mulai,
        jam_selesai:req.body.jam_selesai,
        kd_poli:req.body.kd_poli
    }).then(jadwal=>{
        res.status(200).send({bangsal:jadwal,nessage:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistjadwal = (req,res)=>{
    Jadwal.findAll({
        include:[
            {
            model: Dokter,
            require: true,
            attributes: ['nm_dokter']
            },
            {
                model: Poli,
                require: true,
               
            }
        ]
    }).then(bangsal=>{
        res.status(200).send(jadwal)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editjadwal=(req,res)=>{
    Jadwal.update({
        kd_dokter:req.body.kd_dokter,
        hari:req.body.hari,
        jam_mulai:req.body.jam_mulai,
        jam_selesai:req.body.jam_selesai,
        kd_poli:req.body.kd_poli
    },{
        where:{
            id:req.body.idbangsal
        }
    }).the(bangsal=>{
        res.status(200).send(jadwal)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletejadwal = (req, res) => {
    const { id } = req.params;
    Jadwal.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

