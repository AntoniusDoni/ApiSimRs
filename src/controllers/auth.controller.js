const db = require("../models");
const dotenv = require('dotenv');
const User = db.users;
const Role = db.role;
const Settings=db.setting;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
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
        user.setRoles([1]).then(() => {
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
    }
  })
    .then(user => {
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
        Settings.findAll({attributes:['id','settingName','attr']}).
        then(setting=>{
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            setting:setting,   
          });
              })        
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
  }
  )
  Settings.update({
    attr:req.body.margin
  },{
    where :{
      id:2
    }
  }
  )
  Settings.update({
    attr:req.body.address
  },{
    where :{
      id:3
    }
  }
  )
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
     
      
      var token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
       
        }
        Settings.findAll({attributes:['id','settingName','attr']}).
        then(setting=>{
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            setting:setting,   
          });
              })        
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  // res.status(200).send("Seting Telah di perbaharui.");
}