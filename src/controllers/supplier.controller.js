const db = require("../models");
const supplier = db.supplier;
exports.addsupplier=(req,res)=>{
    supplier.create({
        supplier_name:req.body.supplier_name,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone
    }).then(supplier=>{
        if (!supplier) {
            return res.status(404).send({ message: "failure" });
        } else {
            res.status(200).send({
                suppliers: supplier
            })
        }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.editsupplier=(req,res)=>{
    supplier.update({
        supplier_name:req.body.supplier_name,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone
    },
    {
        where:{id:req.body.id}
    }).then(supplier=>{
        res.status(200).send("Suplier Telah di perbaharui.");
    }).catch(err => {
        res.statsus(500).send({ message: err.message });
      });
};
exports.deletesupplier=(req,res)=>{
    const { id } = req.params;
    supplier.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ message: req.body }))
}
exports.listsupplier=(req,res)=>{
    supplier.findAll({attributes:['id','supplier_name','address','phone','email']}).then(supplier=>{
        res.status(200).send({
            suppliers:supplier
        })
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}