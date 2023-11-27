const connection = require('../config/db');

class DishControllers{

  showAllDishes = (req, res) => {
    let sql = `SELECT * FROM dish WHERE dish_isdeleted = 0`;
    connection.query(sql, (err, result) =>{
      res.render('dishes', {result});
    });
  }

  viewAddDish = (req, res) => {
    let id = req.params.id;
    res.render('formDish', {restaurant_id: id});
  }

  addDish = (req, res) => {
    let id = req.params.id;
    const {dish_name, recipe} = req.body;
    let sql = `INSERT INTO dish (dish_name, recipe, restaurant_id, dish_img) VALUES ("${dish_name}", "${recipe}", "${id}", "plato.jpg")`;

    if(req.file != undefined){
      let img = req.file.filename;
      sql = `INSERT INTO dish (dish_name, recipe, restaurant_id, dish_img) VALUES ("${dish_name}", "${recipe}", "${id}", "${img}")`;
    }

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${id}`);
    });
  }

  totalDeleteDish = (req, res) => {
    let {id, restaurant_id} = req.params;
    let sql = `DELETE FROM dish WHERE dish_id = ${id}`;
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${restaurant_id}`);
    });
  }

  viewOnedish = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM dish WHERE dish_id = ${id} and dish_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.render('oneDish', {result});
    });
  }

  showEditDish = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM dish WHERE dish_id = ${id} and dish_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.render('editFormDish', {result});
    });
  }

  editDish = (req, res) => {
    let id = req.params.id;
    const {dish_name, recipe} = req.body;
    let sql = `UPDATE dish SET dish_name ="${dish_name}", recipe = "${recipe}" WHERE dish_id = "${id}"`;

    if(req.file != undefined){
      let img = req.file.filename;
      sql = `UPDATE dish SET dish_name ="${dish_name}", recipe = "${recipe}", dish_img = "${img}" WHERE dish_id = "${id}"`;
    }

    connection.query(sql, (err, result) =>{
      if(err)throw err;
      res.redirect(`/dish/oneDish/${id}`);
    });
  }
}


module.exports = new DishControllers;