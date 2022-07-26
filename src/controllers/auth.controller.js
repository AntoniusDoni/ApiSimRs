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
var multer  =   require('multer');
const path = require("path")
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
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // Uploads is the Upload_folder_name
      cb(null, "../backend/uploads")
  },
 
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now()+"."+ext)
  }
})
     
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
  
var upload = multer({ 
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
      
      if (mimetype && extname) {
          return cb(null, true);
      }
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);
    } 

// mypic is the name of file attribute
}).single("logo");  

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
      id:4
    }
  })
  Settings.update({
    attr:req.body.address
  },{
    where :{
      id:2
    }
  })
  // 
  console.log(req.body)
  if(req.file){
  upload(req,res,function(err) {
    // console.log(req.file.filename)
        if(err) {
            // res.send(err)
            // console.log(err)
        }
        else {
          Settings.update({
              attr:"uploads/"+req.file.filename
            },{
              where :{
                id:3
              }
            })
            // res.send("Success, Image uploaded!")
        }
    })
  }
  
  
  res.status(200).send("Seting Telah di perbaharui.");
}