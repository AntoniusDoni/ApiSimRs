const db = require("../models");
const category = db.categories;
exports.addcategory=(req,res)=>{
    category.create({
        category_name:req.body.category_name
    }).then(category=>{
        if (!category) {
            return res.status(404).send({ message: "failure" });
        } else {
            res.status(200).send({
                category: category
            })
        }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.editcategory=(req,res)=>{
    category.update({
        category_name:req.body.category_name
    },
    {
        where:{id:req.body.id}
    }).then(category=>{
        res.status(200).send("Kategori Telah di perbaharui.");
    }).catch(err => {
        res.statsus(500).send({ message: err.message });
      });
};
exports.deletecategory=(req,res)=>{
    const { id } = req.params;
    category.destroy({ where: { id: id } })
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ message: req.body }))
}
exports.listcategory=(req,res)=>{
    category.findAll({
        attributes:['id','category_name']}).then(category=>{
        res.status(200).send({
            category:category
        })
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}