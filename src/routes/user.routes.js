const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const { items, category } = require("../models");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Menu
  app.get("/api/user/menu",[authJwt.verifyToken], controller.getMenus);
  app.get("/api/user/all",[authJwt.verifyToken],controller.allAccess);
  app.post("/api/user/getUserbyId",[authJwt.verifyToken],controller.getUserbyId);
  app.post("/api/user/setEditUser",[authJwt.verifyToken],controller.setEditUser);
  app.post("/api/user/setUsermenu",[authJwt.verifyToken],controller.setUsermenu);
  app.get(
    "/api/user/users",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.delete("/api/user/deleteUser/:id",
    [authJwt.verifyToken, authJwt.verifyToken],controller.deleteUser);
  app.get(
    "/api/user/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/user/superadmin",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    controller.superAdminBoard
  );
  
};
