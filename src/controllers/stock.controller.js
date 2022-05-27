const { sequelize } = require('../models')
const db = require("../models");
const purchasedetail = require('../models/purchasedetail');
const Items = db.items;
const Units = db.units;
const Category = db.categories;
const Warehouse = db.warehouse;
const Stock = db.stockies;
const Purchase = db.purchases;
const PurchaseDetail = db.purchaseDetails;
exports.addStock = (async (req, res) => {
    let transaction;
    let is_done = false;
    try {
        transaction = await sequelize.transaction();
        for (var i = 0; i < req.body.details.length; i++) {
            var details = req.body.details[i];
            // console.log("qty:"+details.qty+"-"+details.qty == details.stock_in);
            if (details.quantity == details.stock_in && details.quantity!=0) {
                is_done = true;
                console.log(details.quantity);
            }else if(details.qty == details.stock_in){
                is_done = true;
                // console.log("as"+details.qty);
            }else{
                is_done = false;
            }
            if (details.stock_in > 0) {
                await Stock.create({
                    warehouse_id: req.body.warehouse_code,
                    no_facture: req.body.no_facture,
                    stock_in: details.stock_in,
                    expirate_date: details.expirate_date,
                    date_in: req.body.date_in,
                    stock_out: details.stock_out,
                    date_out: req.body.date_out,
                    status_stock: req.body.status_stock,
                    itemId: details.itemId,
                    no_bact: details.no_bact,
                    no_po: req.body.no_po
                },{ transaction })
                
                if (is_done === true) {
                      PurchaseDetail.update({ is_done: 1 },
                        {
                            where:
                            {
                                no_purchase: req.body.no_po,
                                itemId: details.itemId
                            }
                        },{ transaction }
                    );
                }
            }
            
        }
        if (is_done === true) {
             Purchase.update({
                is_done: 1
            }, { where: { no_po: req.body.no_po } },{ transaction });
        }
        // console.log(is_done);
        await transaction.commit();
        res.status(200).send({
            message: "Sucess"
        })
    } catch (error) {
        console.log(error);
        if (transaction) {
            await transaction.rollback();
        }
        res.status(500).send({ message: error.message });
    }
})
exports.getStockbynoPo = (req,res) =>{
    const { no_po } = req.params;
    const result=db.sequelize.query("select purchaseDetails.no_purchase,purchaseDetails.itemId,purchaseDetails.purchase_price,purchaseDetails.quantity,purchaseDetails.is_done,items.item_code,items.items_name,units.unit_name,categories.category_name,ifnull(Sum(stockies.stock_in),0) as stock from purchaseDetails inner join items on items.id_items=purchaseDetails.itemId inner join units on units.id=items.unitId inner join categories on categories.id=items.categoryId left join stockies on stockies.itemId=purchaseDetails.itemId and stockies.no_po='"+no_po+"'  where purchaseDetails.no_purchase='"+no_po+"' and purchaseDetails.is_done='0' group by purchaseDetails.itemId,stockies.no_po",{type: db.sequelize.QueryTypes.SELECT }).then(
        results =>{
            res.status(200).send({
                results
            })
        })
    //   .catch(err => {
    //     // res.status(500).send({ message: err.message });
    // });   
}
exports.getListStockItem= (req,res)=>{
    Items.findAll({ 
        require: true,
         include: [
            {
                model: Units,
                require: true,
                attributes: ['unit_name']
        },
        {
            model: Stock,
            require:true,
            where :{itemId:sequelize.col('id_items')},          
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
    attributes: ['id_items', 'item_code', 'items_name', 'items_price', 'items_content', 'unitId','categoryId'],
    group:['id_items'] 
    },
    ).then(items => {
        if (items.id_items===null) {
            return res.status(204).send({ message: "Items Not found." });
        }else{
        
        res.status(200).send({
            items:items
        })
    }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
