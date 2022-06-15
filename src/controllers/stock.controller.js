const { sequelize } = require('../models')
const db = require("../models");
const Items = db.items;
const Units = db.units;
const Category = db.categories;
// const Warehouse = db.warehouse;
const Stock = db.stockies;
const Purchase = db.purchases;
const PurchaseDetail = db.purchaseDetails;
const GoodReceipt=db.goodreceipts;

exports.addStock = (async (req, res) => {
    let transaction;
    let is_done = false;
    try {
        transaction = await sequelize.transaction();
         GoodReceipt.create({
            no_fa: req.body.no_facture,
            no_po:req.body.no_po,
            date_in: req.body.date_in,
            userId: req.body.userId,
            grand_total: req.body.grand_total
        }, { transaction });

        for (var i = 0; i < req.body.details.length; i++) {
            var details = req.body.details[i];
            // console.log(details);
            // console.log("qty:"+details.qty+"-"+details.qty == details.stock_in);
            if (details.quantity == details.stock_in && details.quantity!=0) {
                is_done = true;
                console.log(details.quantity);
            }else if(details.qty == details.stock_in){
                is_done = true;
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
                    items_price:details.purchase_price,
                    margin:details.margin,
                    items_sell:details.items_sell,
                    no_bact: details.no_bact,
                    no_po: req.body.no_po
                },{ transaction })
                Items.update({
                    items_price:details.purchase_price
                },{where:{
                    id_items:details.itemId
                }})
                
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
    const result=db.sequelize.query("select purchaseDetails.no_purchase,purchaseDetails.itemId,purchaseDetails.purchase_price,purchaseDetails.margin,purchaseDetails.items_sell,purchaseDetails.quantity,purchaseDetails.is_done,items.item_code,items.items_name,units.unit_name,categories.category_name,ifnull(Sum(stockies.stock_in),0) as stock from purchaseDetails inner join items on items.id_items=purchaseDetails.itemId inner join units on units.id=items.unitId inner join categories on categories.id=items.categoryId left join stockies on stockies.itemId=purchaseDetails.itemId and stockies.no_po='"+no_po+"'  where purchaseDetails.no_purchase='"+no_po+"'  group by purchaseDetails.itemId,stockies.no_po",{type: db.sequelize.QueryTypes.SELECT }).then(
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
                [sequelize.fn('SUM', sequelize.col('stock_out')), 'stockout'],
                [sequelize.fn('MAX', sequelize.col('items_sell')), 'items_sell']
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

exports.getListStockByNoFa = (req,res) =>{
   
    const result=db.sequelize.query("select stockies.no_po,stockies.no_facture,item_code,items_name,stockies.items_price,stockies.items_sell,"+
    "date_format(stockies.date_in,'%d-%m-%Y %H:%i') as date_in,date_format(purchase_date,'%d-%m-%Y %H:%i') as purchase_date,"+
    "quantity,stock_in "+
    "from stockies "+
    "inner join items on items.id_items=stockies.itemId "+
    "inner join purchases on purchases.no_po=stockies.no_po "+
    "inner join purchaseDetails on purchaseDetails.no_purchase=purchases.no_po "+
    "where stockies.no_facture='"+req.body.no_facture+"'"+
    "group by item_code,stockies.no_facture",{type: db.sequelize.QueryTypes.SELECT }).then(
        results =>{
            res.status(200).send({
                results
            })
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });   
}
exports.getListStockByNoPo = (req,res) =>{
    const result=db.sequelize.query("select stockies.no_po,stockies.no_facture,item_code,items_name,stockies.items_price,stockies.items_sell,"+
    "date_format(stockies.date_in,'%d-%m-%Y %H:%i') as date_in,date_format(purchase_date,'%d-%m-%Y %H:%i') as purchase_date,"+
    "quantity,stock_in,if(purchases.is_done='1','Selesai','Belum Selesai') as statusPO "+
    "from stockies "+
    "inner join items on items.id_items=stockies.itemId "+
    "inner join purchases on purchases.no_po=stockies.no_po "+
    "inner join purchaseDetails on purchaseDetails.no_purchase=purchases.no_po "+
    "where date_format(stockies.date_in,'%Y-%m-%d') between '"+req.body.date_start+"' and '"+req.body.date_end+"' and purchaseDetails.is_done='"+req.body.is_done+"' and purchases.is_done='"+req.body.is_done+"' "+
    "group by item_code,stockies.no_facture",{type: db.sequelize.QueryTypes.SELECT }).then(
        results =>{
            res.status(200).send({
                results
            })
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });   
}

exports.getListStockByDate = (req,res) =>{
    const result=db.sequelize.query("select stockies.no_po,stockies.no_facture,item_code,items_name,stockies.items_price,stockies.items_sell,"+
    "date_format(stockies.date_in,'%d-%m-%Y %H:%i') as date_in,date_format(purchase_date,'%d-%m-%Y %H:%i') as purchase_date,"+
    "quantity,stock_in,if(purchases.is_done='1','Selesai','Belum Selesai') as statusPO "+
    "from stockies "+
    "inner join items on items.id_items=stockies.itemId "+
    "inner join purchases on purchases.no_po=stockies.no_po "+
    "inner join purchaseDetails on purchaseDetails.no_purchase=purchases.no_po and purchaseDetails.itemId=stockies.itemId "+
    "where date_format(stockies.date_in,'%Y-%m-%d') between '"+req.body.date_start+"' and '"+req.body.date_end+"' "+
    "group by stockies.itemId,stockies.no_po",{type: db.sequelize.QueryTypes.SELECT }).then(
        results =>{
            res.status(200).send({
                results
            })
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });   
}
exports.getListLastStock= (req,res) =>{
    
    const result=db.sequelize.query("select item_code,items_name,items.items_price,max(items_sell) as items_sell,"+
    "sum(stockies.stock_in)-sum(stockies.stock_out) as stock,unit_name "+
    "from stockies "+
    "inner join items on items.id_items=stockies.itemId "+
    "inner join units on units.id=items.unitId "+
    "group by id_items order by date_out DESC",{type: db.sequelize.QueryTypes.SELECT }).then(
        results =>{
            res.status(200).send({
                results
            })
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });   
}
