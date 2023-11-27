const bcrypt = require("bcrypt");
const connection = require("../config/db");

class RestaurantControllers {
  showAllRestaurant = (req, res) => {
    let sql = `SELECT * FROM restaurant WHERE restaurant_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("restaurants", { result });
    });
  };
  // PTE HACER CONEXIÓN ENTRE TABLAS
  viewOneRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`;
    let sql_dish = `SELECT * FROM dish WHERE restaurant_id = ${id};`;

    connection.query(sql, (err, result) => {
      if (err) throw err;

      connection.query(sql_dish, (err_dish, result_dish) => {
        if (err_dish) throw err_dish;
        console.log("Restaurante:", result);
        console.log("Dish:", result_dish);
        res.render("oneRestaurant", { result, result_dish });
      });

      //res.render('oneRestaurant', {result});
    });
  };

  showEditRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} and restaurant_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("editFormRestaurant", { result });
    });
  };

  editRestaurant = (req, res) => {
    let id = req.params.id;
    const { restaurant_name, style, description } = req.body;
    let sql = `UPDATE restaurant SET restaurant_name = "${restaurant_name}", style = "${style}", description = "${description}" WHERE restaurant_id = "${id}"`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE restaurant SET restaurant_name = "${restaurant_name}", style = "${style}", description = "${description}", restaurant_img = "${img}" WHERE restaurant_id = "${id}"`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${id}`);
    });
  };

  /*
  deleteRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM restaurant WHERE restaurant_id = ${id}`;
    connection.query(sql, (err, result) =>{
      if(err) throw err;
      res.redirect('/restaurant');
    })
  }
  */

  deleteRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `UPDATE restaurant
    LEFT JOIN dish
      ON restaurant.restaurant_id = dish.restaurant_id
    SET restaurant.restaurant_isdeleted = 1, dish.dish_isdeleted = 1
    WHERE restaurant.restaurant_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/restaurant");
    });
  };

  restaurantRegister = (req, res) => {
    res.render("registerForm");
  };

  addRestaurant = (req, res) => {
    const { restaurant_name, style, email, password, password2, phone_number } =
      req.body;

    if (
      restaurant_name === "" ||
      style === "" ||
      email === "" ||
      password === "" ||
      phone_number === ""
    ) {
      return res.render("registerForm", {
        message: "All fields are required",
      });
    }
    if (password !== password2) {
      return res.render("registerForm", {
        message: "Passwords do no match",
      });
    }

    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;
      let sql = `INSERT INTO restaurant (restaurant_name, style, email, password, phone_number, restaurant_img) VALUES ("${restaurant_name}", "${style}", "${email}", "${hash}", "${phone_number}", "default.jpg")`;

      if (req.file != undefined) {
        let img = req.file.filename;
        sql = `INSERT INTO restaurant (restaurant_name, style, email, password, phone_number, restaurant_img) VALUES ("${restaurant_name}", "${style}", "${email}", "${hash}", "${phone_number}", "${img}")`;
      }

      connection.query(sql, (err, result) => {
        if (err) {
          if (err.errno == 1062) {
            return res.render("registerForm", {
              message: "This email already exists in the platform",
            });
          } else {
            throw err;
          }
        }
        res.redirect("/restaurant");
      });
    });
  };

  viewLogin = (req, res) => {
    res.render("formLogin");
  };

  login = (req, res) => {
    const {email, password } = req.body;
    console.log(req.body);
    let sql = `SELECT * FROM restaurant WHERE email = "${email}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length == 1) {
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (err) throw err;
          if (resultCompare) {
            res.redirect(`/restaurant/oneRestaurant/${result[0].restaurant_id}`);
          } else {
            res.render("formLogin", { message: "Password is not correct" });
          }
        });
      } else {
        return res.render("formLogin", { message: "Email does not exist" });
      }
    });
  };
}

module.exports = new RestaurantControllers();
