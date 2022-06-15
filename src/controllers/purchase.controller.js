const db = require("../models");
const { sequelize } = require('../models');
const Items = db.items;
const Units = db.units;
const Category = db.categories;
const Purchase = db.purchases;
const PurchaseDetail = db.purchaseDetails;
const Supplier = db.supplier;
const Stock = db.stockies;
const goodReceipts=db.goodReceipts;

exports.addPurchase = (async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const po = await Purchase.create({
            no_po: req.body.no_po,
            supplierId: req.body.supplierId,
            purchase_date: req.body.purchase_date,
            categoryId:req.body.categoryId,
            grand_total: req.body.grand_total,
        }, { transaction });

        for (var i = 0; i < req.body.details.length; i++) {
            var detailsPO = req.body.details[i];
            // console.log(req.body.details[i].itemId);
            await PurchaseDetail.create({
                no_purchase: po.no_po,
                itemId: detailsPO.itemId,
                quantity: detailsPO.quantity,
                purchase_price: detailsPO.purchase_price,
                margin:detailsPO.margin,
                items_sell:detailsPO.sell_price
            }, { transaction })
        }
        // console.log('success');
        await transaction.commit();

        Purchase.findOne({
            where: { no_po: po.no_po },
            include: [{
                model: Items,
                require: true,
                attributes: ['item_code', 'items_name', 'items_price', 'items_content'],
                through: {
                    attributes: ['purchase_price', 'quantity', 'no_purchase'],
                },
                include: [
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
                ]
            }],
            attributes: ['no_po', 'supplierId', 'purchase_date', 'grand_total', 'is_done']
        }).then(purchase => {
            res.status(200).send({
                purchase: purchase
            })
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    } catch (error) {
        console.log(error);
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).send({ message: error.message });
    }
});

exports.listOrderbynoPurchase = (req, res) => {
    Purchase.findOne({
        where: { no_order: req.body.no_order },
        include: [{
            model: Items,
            require: true,
            attributes: ['item_code', 'items_name', 'items_price', 'items_content'],
            through: {
                attributes: ['purchase_price', 'quantity', 'no_purchase'],
            },
            include: [
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
            ]
        }],
        attributes: ['no_po', 'supplierId', 'purchase_date', 'grand_total', 'is_done']
    }).then(purchase => {
        res.status(200).send({
            purchase: purchase
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
function getMonth() {
    var month = (new Date().getMonth() + 1);
    return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}

exports.getLastNoPo = (req, res) => {
    Purchase.findAndCountAll({
        where:
            sequelize.where(sequelize.fn('date_format', sequelize.col('purchase_date'), '%m'), getMonth())
        ,
        limit: 1,
        attributes: ['no_po'],
        order: [[sequelize.literal('no_po'), `DESC`]]
    }).then(purchase => {
        if (!purchase) {
            purchase
        } else {
            res.status(200).send({
                purchase
            })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.getListPurchaseByDate = (req,res) =>{
    const result=db.sequelize.query("select purchases.no_po,supplier_name,date_format(purchase_date,'%d-%m-%Y %H:%i')as purchase_date,grand_total,"+
    "is_done "+
    " from purchases "+
    "inner join suppliers on suppliers.id=purchases.supplierId "+
    "where date_format(purchases.purchase_date,'%Y-%m-%d') between '"+req.body.date_start+"' and '"+req.body.date_end+"' order by purchase_date ASC",{type: db.sequelize.QueryTypes.SELECT }).then(
        results =>{
            res.status(200).send({
                results
            })
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.listPurchase = (req, res) => {
    Purchase.findAll(
        {
            include: [
                {
                    model: Items,
                    require: true,
                    attributes: ['item_code', 'items_name', 'items_price', 'items_content'],
                    through: {
                        attributes: ['purchase_price', 'quantity', 'no_purchase'],
                    },
                    include: [
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
                    ]
                },
                {
                    model: Supplier,
                    require: true,
                    attributes: ['supplier_name'],
                }
            ],
            attributes: ['no_po', 'supplierId',
                [
                    sequelize.fn
                        (
                            "DATE_FORMAT",
                            sequelize.col("purchase_date"),
                            "%d-%m-%Y %H:%i:%s"
                        ),
                    "purchase_date",
                ],
                'grand_total', 'is_done']
        }

    ).then(purchase => {
        res.status(200).send({
            purchase: purchase
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.listDetailPurchase = (req, res) => {
    PurchaseDetail.findAll({
        where: { no_purchase: req.body.no_po, is_done: 0 },
        include: [
            {
                model: Items,
                require: true,
                attributes: ['item_code', 'items_name', 'items_price', 'items_content'],
                include: [
                    {
                        model: Units,
                        require: true,
                        attributes: ['unit_name']
                    },
                    {
                        model: Category,
                        require: true,
                        attributes: ['category_name']
                    },
                    // {
                    //     model:Stock,
                    //     // where:{no_po:req.body.no_po},
                    //     // require:false,
                    //     attributes:[
                    //         [sequelize.fn('SUM', sequelize.col('stock_in')), 'stock']],                               
                    // }
                ],

            },

        ],
        // group:[`item->stocky.no_po`,`item->stocky.itemId`]
    }).then(purchase => {      
        res.status(200).send({
            purchase: purchase,
        })
        
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.getStock = (req, res) => { 
   Stock.findAll({
        where:
            {no_po: req.body.no_po },
        attributes: ['itemId',
            [sequelize.fn('SUM', sequelize.col('stock_in')), 'stock']
        ],
        group: ['itemId', 'no_po']
    }).then(stockies=>{
        res.status(200).send({
            stockies: stockies
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
    
}
exports.deletePurchase = (req, res) => {
    // const { no_po } = req.body.no_po;    
    PurchaseDetail.destroy({ where: { no_purchase: req.body.no_po } })
        .then(() => {
            Purchase.destroy({ where: { no_po: req.body.no_po } })
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ message: err.message }))
}
