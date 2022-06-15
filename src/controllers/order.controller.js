const { sequelize } = require('../models')
const db = require("../models");
const Items=db.items;
const Units = db.units;
const Category = db.categories;
const Order = db.Order;
const OrderDetails = db.OrderDetails;
const Stock=db.stockies;
const Op = sequelize.Op;
const moment = require('moment');

 exports.addOrder = (async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const po = await Order.create({
                no_order: req.body.no_order,
                customerName: req.body.customerName,
                customer_phone: req.body.customer_phone,
                status: req.body.status,
                totals: req.body.totals,
                total_payment:req.body.total_payment,
                UserID: req.body.UserID,
                order_date:req.body.order_date
        }, { transaction });

        for(var i=0;i<req.body.details.length;i++){
            var orderDetails=req.body.details[i];
            // console.log(req.body.details[i].itemId);          
            var qty=orderDetails.quantity;
            // console.log("qty:"+qty);
            await Stock.findAll({
                where:{
                    itemId:orderDetails.itemId,     
                },
                attributes:['itemId','stock_in','stock_out','no_bact','no_facture','expirate_date','date_in'],
                order:[['expirate_date','ASC'],['date_in','ASC']]
            },{transaction}).then(stocks=>{
                // let mapStock=[];               
                stocks.map((stock)=>{
                    var out=0;
                    // console.log(stock.expirate_date)
                    if(stock.stock_in<=qty){
                        out=stock.stock_in
                        qty=qty-stock.stock_in
                    }else{
                        out=qty
                        // qty=qty-out
                    }
                   
                    if (qty!=0&&stock.itemId==orderDetails.itemId) {                 
                        // console.log("detail: "+stock.itemId+" qty :"+orderDetails.quantity)      
                        var stockOut=parseFloat(stock.stock_out)+parseFloat(out) 
                        OrderDetails.create({
                            orderId: req.body.no_order,
                            itemsId: orderDetails.itemId,
                            quantity: out,
                            itemPrice: orderDetails.items_price,
                            no_bacth: stock.no_bact,
                            no_fa: stock.no_facture
                        })

                        Stock.update({
                            stock_out: stockOut,
                            date_out:req.body.order_date,
                            status_stock:1
                        }, {
                            where: {
                                no_bact: stock.no_bact,
                                no_facture: stock.no_facture,
                                itemId: stock.itemId,                               
                            }
                        })
                        qty=qty-out
                    }else{
                        qty=orderDetails.quantity;
                    }
                })
              
            });           
        }
        await transaction.commit(); 
        Order.findOne({
            where:{no_order:req.body.no_order},
            include:[{
                model: Items,
                require: true,
                attributes: ['item_code','items_name','items_price','items_content'],
                through: {
                    attributes: ['itemPrice','quantity','no_bacth','no_fa'],
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
                ]
            }],
            attributes: ['no_order','order_date','customerName','customer_phone','status','totals']
        }).then(order => {
            res.status(200).send({
                Order: order
            })
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }catch (error) {
        console.log(error);
        if(transaction) {
            await transaction.rollback();
         }
         res.status(500).send({ message: error.message });
    }
})

exports.listOrderbynoOrder=(req,res)=>{
    Order.findOne({
        where:{no_order:req.body.no_order},
        include:[{
            model: Items,
            require: true,
            attributes: ['item_code','items_name','items_price','items_content'],
            through: {
                attributes: ['itemPrice','quantity','no_order','no_bacth','no_fa'],
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
            ]
        }],
        attributes: ['no_order','order_date','customerName','customer_phone','status','totals']
    })
}

exports.listOrder = (req, res) => {
    Order.findAll(
        {
            include: [
                {
                    model: Items,
                    require: true,
                    attributes: ['item_code','items_name','items_price','items_content'],
                    through: {
                        attributes: ['itemPrice','quantity','no_order','no_bacth','no_fa'],
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
                    ]
                },
            ],
            attributes: ['no_order','order_date','customerName','customer_phone','status','totals']
        }

    ).then(Order => {
        res.status(200).send({
            Order: Order
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.getLastOrder = (req, res) => {
    const NOW = moment().format('YYYY-MM-DD');
    Order.findAndCountAll({
        where:
            sequelize.where(sequelize.fn('date_format', sequelize.col('order_date'), '%Y-%m-%d'), NOW)
        ,
        limit: 1,
        attributes: ['no_order'],
        order: [[sequelize.literal('no_order'), `DESC`]]
    }).then(order => {
        if (!order) {
            order
        } else {
            res.status(200).send({
                order
            })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
  }

  exports.getLisDetailOrderbyDate = (req,res) =>{
    const { date_start } = req.body.date_start;
    const { date_end } = req.body.date_end;
    const result=db.sequelize.query("Select items.*,OrderDetails.itemPrice,sum(OrderDetails.quantity) as quantity from Orders "+
    "inner join OrderDetails on OrderDetails.orderId=Orders.no_order "+
    "inner join items on items.id_items=OrderDetails.itemsId "+
    "inner join stockies on stockies.itemId=OrderDetails.itemsId and stockies.no_bact=OrderDetails.no_bacth and stockies.no_facture=OrderDetails.no_fa "+
    "where date_format(order_date,'%Y-%m-%d') between '"+req.body.date_start+"' and '"+req.body.date_end+"' group by OrderDetails.itemsId,OrderDetails.itemPrice;",{type: db.sequelize.QueryTypes.SELECT }).then(
        results =>{
            res.status(200).send({
                results
            })
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });   
}