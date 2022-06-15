const { authJwt } = require("../middleware");
const Purchase = require('../controllers/purchase.controller');
const Order = require('../controllers/order.controller');
const itemContrller = require("../controllers/item.controller");
const unitsController = require("../controllers/units.controller");
const categoryContrller = require("../controllers/category.controller");
const SupplierController = require('../controllers/supplier.controller');
const Warehouse = require('../controllers/warehouse');
const Stock=require('../controllers/stock.controller')
const Setting = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/setting/updateSetting",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Setting.updateSetting
  );
  //Stock
  app.post("/api/stock/addstock",
  [authJwt.verifyToken,authJwt.isSuperOrAdmin],
  Stock.addStock
  )
  app.get(
    "/api/stock/getStockPurchase/:no_po",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Stock.getStockbynoPo
  );
  app.get(
    "/api/stock/getlisStockItem",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Stock.getListStockItem
  );
  app.post("/api/stock/getListStockByDate",
  [authJwt.verifyToken,authJwt.isSuperOrAdmin],
  Stock.getListStockByDate
  )
  app.post("/api/stock/getListStockByNoFa",
  [authJwt.verifyToken,authJwt.isSuperOrAdmin],
  Stock.getListStockByNoFa
  )
  app.post("/api/stock/getListStockByNoPo",
  [authJwt.verifyToken,authJwt.isSuperOrAdmin],
  Stock.getListStockByNoPo
  )
  
  app.get("/api/stock/getListLastStock",
  [authJwt.verifyToken,authJwt.isSuperOrAdmin],
  Stock.getListLastStock
  )
  // PO
  app.get(
    "/api/purchase/listpurchase",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Purchase.listPurchase
  );
  app.post("/api/purchase/listDetailPurchase",
  [authJwt.verifyToken,authJwt.isSuperOrAdmin],
  Purchase.listDetailPurchase
  )
  app.post("/api/purchase/getListPurchaseByDate",
  [authJwt.verifyToken,authJwt.isSuperOrAdmin],
  Purchase.getListPurchaseByDate
  )
  app.get(
    "/api/purchase/getLastNoPo",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Purchase.getLastNoPo
  );
  app.post(
    "/api/purchase/addPurchase",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Purchase.addPurchase
  );
 
  app.post(
    "/api/purchase/deletepurchase/",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Purchase.deletePurchase
  );

  // Order
  app.get(
    "/api/order/listOrder",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.listOrder
  );
  app.get(
    "/api/order/lastOrder",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.getLastOrder
  );
  app.post(
    "/api/order/addOrder",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.addOrder
  );
  app.post(
    "/api/order/getListOrderbyDate",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.getLisDetailOrderbyDate
  )
  app.post(
    "/api/order/getListOrderbyDate1",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.getListOrderByDate1
  )
  app.post(
    "/api/order/getListOrderDate",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.getListOrderByDate
  )
  app.post(
    "/api/order/getListOrderbynoOrder",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.listOrderbynoOrder
  )
  app.post(
    "/api/order/listOrderRacik",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Order.listOrderRacik
  )
  
  // Supllier
  app.get(
    "/api/suppliers/listsupplier",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    SupplierController.listsupplier
  );
  app.post(
    "/api/suppliers/addsupplier",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    SupplierController.addsupplier
  );
  app.post(
    "/api/suppliers/editsupplier",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    SupplierController.editsupplier
  );
  app.delete(
    "/api/suppliers/deletesupplier/:id",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    SupplierController.deletesupplier
  );
  // category item
  app.get(
    "/api/category/listcategory",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    categoryContrller.listcategory
  );
  app.post(
    "/api/category/addcategory",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    categoryContrller.addcategory
  );
  app.post(
    "/api/category/editcategory",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    categoryContrller.editcategory
  );
  app.delete(
    "/api/category/deletecategory/:id",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    categoryContrller.deletecategory
  );
  // Units
  app.get(
    "/api/units/listunit",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    unitsController.listUnit
  );
  app.post(
    "/api/units/addunit",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    unitsController.addUnits
  );
  app.post(
    "/api/units/editunit",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    unitsController.editunit
  );
  app.delete(
    "/api/units/deleteunit/:id",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    unitsController.deleteunit
  );
  // items
  app.get(
    "/api/items/listitem",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    itemContrller.listItems
  );
  app.post("/api/item/getItem",
  [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    itemContrller.getItem
  )
  app.post(
    "/api/item/additem",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    itemContrller.addItem
  );
  app.post(
    "/api/items/edititem",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    itemContrller.edititems
  );
  app.delete(
    "/api/items/deleteitem/:id",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    itemContrller.deleteitems
  )
  
  // warehouse
  app.get(
    "/api/warehouse/listwarehouse",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Warehouse.listwarehouse
  );
  app.post(
    "/api/warehouse/addwarehouse",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Warehouse.addwarehouses
  );
  app.post(
    "/api/warehouse/editwarehouse",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Warehouse.editwarehouse
  );
  app.delete(
    "/api/warehouse/deletewarehouse/:id",
    [authJwt.verifyToken, authJwt.isSuperOrAdmin],
    Warehouse.deletewarehouse
  )
}
