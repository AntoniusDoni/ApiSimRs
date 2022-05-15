const db = require("../models");
const  { sequelize } = require('../models');
const Op = sequelize.Op;
const Items = db.items;
const Units = db.units;
const Category=db.categories;
const Stock=db.stockies;

exports.addItem = (req, res) => {
    Items.create({
        item_code: req.body.item_code,
        items_name: req.body.items_name,
        items_price: req.body.items_price,
        unitId: req.body.unitId,
        items_content: req.body.items_content,
        categoryId:req.body.categoryId
    }).then(
        item => {
            if (!item) {
                return res.status(404).send({ message: "failure" });
            } else {
                Items.findOne({
                    where: { id_items: item.id_items },
                    include: {
                        model: Units,
                        require: true,
                        attributes: ['unit_name']
                    },
                    include:[
                        {
                            model: Units,
                            require: true,
                            attributes: ['unit_name']
                        },
                        {
                            model: Category,
                            require: true,
                            attributes: ['category_name']
                        }
                    ],
                    attributes: ['id_items', 'item_code', 'items_name', 'items_price', 'items_content', 'unitId','categoryId']
                }).then(itemunit => {
                    res.status(200).send({
                        items: itemunit
                    })
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }
        }
    ).catch(err => {
        res.status(500).send({ message: err.message });
    });
}


exports.listItems = (req, res) => {
    Items.findAll(
        {
            include:[
            {
                model: Units,
                require: true,
                attributes: ['unit_name']
            },
            {
                model: Category,
                require: true,
                attributes: ['category_name']
            }
        ],
          
            attributes: ['id_items', 'item_code', 'items_name', 'items_price', 'items_content', 'unitId','categoryId']
        }

    ).then(items => {
        res.status(200).send({
            items: items
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getItem = (req, res) => {
    Items.findOne({ 
        require: true,
        where: {              
            item_code: req.body.keyword,
            
        }, include: [
            {
                model: Units,
                require: true,
                attributes: ['unit_name']
        },
        {
            model: Stock,
            require:true,
            // where :{itemId:sequelize.col('id_items')},          
            attributes:[
                [sequelize.fn('SUM', sequelize.col('stock_in')), 'stock'],
                [sequelize.fn('SUM', sequelize.col('stock_out')), 'stockout']
            ],
            raw: true,
        },
        {
            model: Category,
            require: true,
            attributes: ['category_name']
        }
    ],
    attributes: ['id_items', 'item_code', 'items_name', 'items_price', 'items_content', 'unitId','categoryId'] 
    }
    
    ).then(items => {
        if (items.id_items===null) {
            return res.status(204).send({ message: "Items Not found." });
        }else{
        
        res.status(200).send({
            id: items.id_items,
            item_code: items.item_code,
            item_name: items.items_name,
            items_price: items.items_price,
            unitId: items.unit.unit_name,
            items_content: items.items_content,
            stock:items.stocky,
            category_name:items.category.category_name
        })
    }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.edititems = (req, res) => {
  
    Items.update({
        items_name: req.body.items_name,
        item_code: req.body.item_code,
        items_price: req.body.items_price,
        unitId: req.body.unitId,
        items_content: req.body.items_content
    },
        {
            where: { id_items: req.body.id }
        }).then(item => {
            if (!item) {
                return res.status(404).send({ message: "failure" });
            } else {
                Items.findOne({
                    where: { id_items: req.body.id },
                    include:[
                        {
                            model: Units,
                            require: true,
                            attributes: ['unit_name']
                        },
                        {
                            model: Category,
                            require: true,
                            attributes: ['category_name']
                        }
                    ],                     
                    attributes: ['id_items', 'item_code', 'items_name', 'items_price', 'items_content', 'unitId','categoryId']
                }).then(itemunit => {
                    res.status(200).send({
                        items: itemunit
                    })
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }

        }).catch(err => {
            res.statsus(500).send({ message: err.message });
        });
};
exports.deleteitems = (req, res) => {
    const { id } = req.params;
    Items.destroy({ where: { id_items: id } })
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ message: req.body }))

}