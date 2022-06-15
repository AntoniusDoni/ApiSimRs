const db = require("../../models");
const { sequelize } = require('../../models');
const { Op } = require("sequelize");
const UserMenu=db.user_menu;
const User = db.users
const Menu=db.menus;

exports.getlistMenu = (req, res) => {
    User.findOne({
        where: {
          id: req.body.id
        },
        include:[
            {
                model:Menu,
                attributes: ['id', 'menuName', 'link', 'parent'],

                include:[
                    {
                    model:Menu,
                    as: 'child',
                    attributes: ['id', 'menuName', 'link', 'parent']
                }
                ]
            }
        ]
      }).then(user=>{
        res.status(200).send({
            user,   
          });
      })
}
exports.getlistMenus = (req, res) => {
  const result=db.sequelize.query("select menus.id,menus.menuName,menus.link,menus.parent from users "+
  "inner join user_menus on user_menus.idUser=users.id "+
  "inner join menus on menus.id=user_menus.menuId "+
  "left join menus as child on child.parent=menus.id and child.id=user_menus.menuId "+
  "where users.id='1'",{type: db.sequelize.QueryTypes.SELECT }).then(
      results =>{
          res.status(200).send({
              results
          })
      })
    .catch(err => {
      res.status(500).send({ message: err.message });
  });
}