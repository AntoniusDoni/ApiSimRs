const db = require("../models");
const Units = db.units;
exports.addUnits=(req,res)=>{
    Units.create({
        unit_name:req.body.unit_name
    }).then(unit=>{
        if (!unit) {
            return res.status(404).send({ message: "failure" });
        } else {
            res.status(200).send({
                units: unit
            })
        }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.editunit=(req,res)=>{
    Units.update({
        unit_name:req.body.unit_name
    },
    {
        where:{id:req.body.id}
    }).then(unit=>{
        res.status(200).send("Satuan Telah di perbaharui.");
    }).catch(err => {
        res.statsus(500).send({ message: err.message });
      });
};
exports.deleteunit=(req,res)=>{
    const { id } = req.params;
    Units.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ message: req.body }))
}
exports.listUnit=(req,res)=>{
    Units.findAll({attributes:['id','unit_name']}).then(unit=>{
        res.status(200).send({
            units:unit
        })
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}