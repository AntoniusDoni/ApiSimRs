const db = require("../models");
const warehouses = db.warehouse;
exports.addwarehouses=(req,res)=>{
    warehouses.create({
        warehouse_name:req.body.warehouse_name
    }).then(warehouse=>{
        if (!warehouse) {
            return res.status(404).send({ message: "failure" });
        } else {
            res.status(200).send({
                warehouses: warehouse
            })
        }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.editwarehouse=(req,res)=>{
    warehouses.update({
        warehouse_name:req.body.warehouse_name
    },
    {
        where:{id:req.body.id}
    }).then(warehouse=>{
        res.status(200).send("Gudang Telah di perbaharui.");
    }).catch(err => {
        res.statsus(500).send({ message: err.message });
      });
};
exports.deletewarehouse=(req,res)=>{
    const { id } = req.params;
    warehouses.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ message: req.body }))
}
exports.listwarehouse=(req,res)=>{
    warehouses.findAll({attributes:['id','warehouse_name']}).then(warehouse=>{
        res.status(200).send({
            warehouses:warehouse
        })
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}