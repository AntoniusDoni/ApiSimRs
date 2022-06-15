const db = require("../models");
const dotenv = require('dotenv');
const User = db.users;
const Role = db.role;
const Settings=db.setting;
const Menu=db.menus;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { sequelize } = require('../models');
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([2]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.getSetting=(req,res)=>{
  Settings.findAll({attributes:['id','settingName','attr']}).
  then(setting=>{
          res.status(200).send({
            settings:setting,   
          });
        }).catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.login = (req, res) => {
  const result=db.sequelize.query("select users.*,menus.id as menuId,menus.menuName,menus.link,menus.parent,child.id as childId,child.menuName,child.link,child.parent "+
  "from users  "+
  "inner join user_menus on user_menus.idUser=users.id  "+
  "inner join menus on menus.id=user_menus.menuId  "+
  "inner join menus as child on child.parent=menus.id  "+
  "where users.username='"+req.body.username+"' group by menus.id;",{type: db.sequelize.QueryTypes.SELECT }).then(
      user =>{
        console.log(user[0].id)
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
          expiresIn: 86400 // 24 hours
        });
    
       
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            // roles: authorities,
            accessToken: token,
            // menus:user.menus
          });           
     

      })
    .catch(err => {
      res.status(500).send({ message: err.message });
  });
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    },
    include:[
      {
          model:Menu,
          attributes: ['id', 'menuName', 'link', 'parent'],
          require: true,
      }
  ]
  })
    .then(user => {
      // console.log(user)
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
       
        }
        var arrayMenu=[];
        user.menus.map((menu,index)=>{
          arrayMenu.push({id:menu.id,parent:menu.parent,title:menu.menuName,link:menu.link})
        })
        // console.log(arrayMenu)
        var nodes =arrayMenu;
        tree = function (data, root) {
          var r = [], o = {};
          data.forEach(function (a) {
              if (o[a.id] && o[a.id].children) {
                  a.children = o[a.id] && o[a.id].children;
              }
              o[a.id] = a;
              if (a.parent === root) {
                  r.push(a);
              } else {
                  o[a.parent] = o[a.parent] || {};
                  o[a.parent].children = o[a.parent].children || [];
                  o[a.parent].children.push(a);
              }
          });
          return r;
      }(nodes, 0);
      // console.log(tree);

          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            menus:tree
          });
              
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.updateSetting = (req, res) => {
  // console.log(req.body.title);
  Settings.update({
    attr:req.body.title
  },{
    where :{
      id:1
    }
  })
  Settings.update({
    attr:req.body.margin
  },{
    where :{
      id:2
    }
  })
  Settings.update({
    attr:req.body.address
  },{
    where :{
      id:3
    }
  })
  Settings.update({
    attr:req.body.apotker
  },{
    where :{
      id:4
    }
  })
  Settings.update({
    attr:req.body.sipa
  },{
    where :{
      id:5
    }
  })
  
  res.status(200).send("Seting Telah di perbaharui.");
}