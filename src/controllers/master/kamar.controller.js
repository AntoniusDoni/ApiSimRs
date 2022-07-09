const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Kamar=db.kamars;
const Bangsal=db.bangsals;
exports.addkamar = (req, res) => {
    Kamar.create({
        kode_kamar:req.body.kode_kamar,
        nm_kamar:req.body.nm_kamar,
        idbangsal:req.body.idbangsal,
        harga:req.body.harga,
        kelas:req.body.kelas,
        stts_kamar:req.body.stts_kamar,
        isactive:req.body.isactive
    }).then(kamar=>{
        res.status(200).send({kamar:kamar,message:"success"})
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlistkamar = (req,res)=>{
    Kamar.findAll({
        include:[
            {
            model: Bangsal,
            require: true,
            attributes: ['nm_bangsal']
            }
        ] 
    }
    ).then(kamar=>{
        res.status(200).send(kamar)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.editkamar=(req,res)=>{
    Kamar.update({
        kode_kamar:req.body.kode_kamar,
        nm_kamar:req.body.nm_kamar,
        idbangsal:req.body.idbangsal,
        harga:req.body.harga,
        kelas:req.body.kelas,
        stts_kamar:req.body.stts_kamar,
        isactive:req.body.isactive
    },{
        where:{
            id:req.body.id
        }
    }).then(kamar=>{
        res.status(200).send(kamar)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.deletekamar = (req, res) => {
    const { id } = req.params;
    Kamar.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        }).catch(err => res.status(400).json({ message: req.body }))

}

