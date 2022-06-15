const db = require("../models");
const { sequelize } = require('../models')
const User = db.users;
const Role = db.roles;
const User_roles = db.user_roles;
const User_menus=db.user_menus;
var bcrypt = require("bcryptjs");
const Menu=db.menus;
  exports.allAccess = (req, res) => {
    User.findAll({
      include:[{
        model:Role,
        require: true,
        attributes:['name']
      }, {
        model:Menu,
        attributes: ['id', 'menuName', 'link', 'parent'],
        require: true,
      }
    ], attributes:['id','username','email']
    }).then(users=>{
      res.status(200).send(users);
    })
    
  };
  exports.getUserbyId = (req, res) => {
    User.findOne({
      where:{id:req.body.id},
      include:[{
        model:Role,
        require: true,
        attributes:['id','name']
      },
    ]
    }).then(user=>{
      res.status(200).send(user);
    }) .catch(err => {
      res.status(500).send({ message: err.message });
  }); 
  };
  exports.setEditUser=(req,res)=>{
 
    let updatecondition={}
        if(req.body.password!==""){  
      updatecondition={
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }    
    }else{
      updatecondition={
        username: req.body.username,
        email: req.body.email,
      }
    }
  
    User.update(updatecondition,{
      where:{id:req.body.id}
    }).then(user=>{
      User_roles.update({roleId:req.body.isSelected},{where:{userId:req.body.id}}).then(
        userRole=>{
         
        })
      User.findOne({
        where:{id:req.body.id},
        include:[{
          model:Role,
          require: true,
          attributes:['id','name']
        },
      ]
      }).then(user=>{
        res.status(200).send(user);
      }) .catch(err => {
        res.status(500).send({ message: err.message });
    }); 
    })
  }
  exports.deleteUser=(req, res) => {
    const { id } = req.params;
    User_roles.destroy({where:{userId:id}})
    User.destroy({ where: { id:id } })
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ message: req.body }))
  }
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  exports.superAdminBoard = (req, res) => {
    res.status(200).send("Super Admin Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.getMenus = (async (req, res)=>{
    Menu.findAll({attributes: ['id','menuName', 'link', 'parent']}).then(
      menu=>{
        var arrayMenu=[];
        menu.map((menu,index)=>{
          arrayMenu.push({value:menu.id,label:menu.menuName,parent:menu.parent})
        })
        var nodes =arrayMenu;
        tree = function (data, root) {
          var r = [], o = {};
          data.forEach(function (a) {
              if (o[a.value] && o[a.value].children) {
                  a.children = o[a.value] && o[a.value].children;
              }
              o[a.value] = a;
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
      res.status(200).send({menu:tree});
      }
    )
  })

  exports.setUsermenu=(async(req,res)=>{
    const list=req.body.checked
    let transaction
    try {
      transaction = await sequelize.transaction();
    User_menus.destroy({where:{idUser:req.body.id}})
    for (var i=0;i<list.length;i++) { 
      let menuId=list[i];
      User_menus.create(
        {idUser:req.body.id,menuId:menuId}
      )
     await Menu.findOne({where:{id:menuId},attributes:['parent']},{transaction}).then(
        menus=>{
          User_menus.findOne({where: {idUser:req.body.id,menuId:menus.parent}}).then(
            usermenu=>{
              if(!usermenu&&menus.parent!=0){
                // console.log(menus.parent);
                User_menus.create(
                  {idUser:req.body.id,menuId:menus.parent}
                )
              }
            }
          )
        }
          
      )
    }
    await transaction.commit(); 
     await  User.findOne({
      where:{id:req.body.id},
      include:[{
        model:Role,
        require: true,
        attributes:['name']
      }, {
        model:Menu,
        attributes: ['id', 'menuName', 'link', 'parent'],
        require: true,
      }
    ], attributes:['id','username','email']
    }).then(user=>{
      res.status(200).send(user);
    }) .catch(err => {
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