const { authJwt } = require("../middleware");
const Purchase = require('../controllers/purchase.controller');
const Order = require('../controllers/order.controller');
const itemContrller = require("../controllers/item.controller");
const unitsController = require("../controllers/units.controller");
const categoryContrller = require("../controllers/category.controller");
const SupplierController = require('../controllers/supplier.controller');
const Warehouse = require('../controllers/warehouse');
const Stock=require('../controllers/stock.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //Stock
  app.post("/api/stock/addstock",
  [authJwt.verifyToken,authJwt.isSuperAdmin],
  Stock.addStock
  )
  app.get(
    "/api/stock/getStockPurchase/:no_po",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Stock.getStockbynoPo
  );
  app.get(
    "/api/stock/getlisStockItem",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Stock.getListStockItem
  );
  // PO
  app.get(
    "/api/purchase/listpurchase",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Purchase.listPurchase
  );
  app.post("/api/purchase/listDetailPurchase",
  [authJwt.verifyToken,authJwt.isSuperAdmin],
  Purchase.listDetailPurchase
  )
  app.get(
    "/api/purchase/getLastNoPo",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Purchase.getLastNoPo
  );
  app.post(
    "/api/purchase/addPurchase",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Purchase.addPurchase
  );
 
  app.post(
    "/api/purchase/deletepurchase/",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Purchase.deletePurchase
  );

  // Order
  app.get(
    "/api/order/listOrder",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Order.listOrder
  );
  app.get(
    "/api/order/lastOrder",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Order.getLastOrder
  );
  app.post(
    "/api/order/addOrder",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Order.addOrder
  );
  app.post(
    "/api/order/getListOrderbyDate",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Order.getLisDetailOrderbyDate
  )
  // Supllier
  app.get(
    "/api/suppliers/listsupplier",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    SupplierController.listsupplier
  );
  app.post(
    "/api/suppliers/addsupplier",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    SupplierController.addsupplier
  );
  app.post(
    "/api/suppliers/editsupplier",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    SupplierController.editsupplier
  );
  app.delete(
    "/api/suppliers/deletesupplier/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    SupplierController.deletesupplier
  );
  // category item
  app.get(
    "/api/category/listcategory",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    categoryContrller.listcategory
  );
  app.post(
    "/api/category/addcategory",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    categoryContrller.addcategory
  );
  app.post(
    "/api/category/editcategory",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    categoryContrller.editcategory
  );
  app.delete(
    "/api/category/deletecategory/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    categoryContrller.deletecategory
  );
  // Units
  app.get(
    "/api/units/listunit",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    unitsController.listUnit
  );
  app.post(
    "/api/units/addunit",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    unitsController.addUnits
  );
  app.post(
    "/api/units/editunit",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    unitsController.editunit
  );
  app.delete(
    "/api/units/deleteunit/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    unitsController.deleteunit
  );
  // items
  app.get(
    "/api/items/listitem",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    itemContrller.listItems
  );
  app.post("/api/item/getItem",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
    itemContrller.getItem
  )
  app.post(
    "/api/item/additem",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    itemContrller.addItem
  );
  app.post(
    "/api/items/edititem",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    itemContrller.edititems
  );
  app.delete(
    "/api/items/deleteitem/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    itemContrller.deleteitems
  )
  // warehouse
  app.get(
    "/api/warehouse/listwarehouse",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Warehouse.listwarehouse
  );
  app.post(
    "/api/warehouse/addwarehouse",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Warehouse.addwarehouses
  );
  app.post(
    "/api/warehouse/editwarehouse",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Warehouse.editwarehouse
  );
  app.delete(
    "/api/warehouse/deletewarehouse/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    Warehouse.deletewarehouse
  )
}
