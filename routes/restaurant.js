var express = require('express');
var router = express.Router();
const restaurantControllers = require('../controllers/restaurantControllers');
const upLoadImage = require('../middlewares/multer');

router.get('/', restaurantControllers.showAllRestaurant);
router.get('/oneRestaurant/:id', restaurantControllers.viewOneRestaurant);
router.get('/editRestaurant/:id', restaurantControllers.showEditRestaurant);
router.post('/editRestaurant/:id', upLoadImage('restaurants'), restaurantControllers.editRestaurant);
router.get('/deleteRestaurant/:id', restaurantControllers.deleteRestaurant);
router.get('/register', restaurantControllers.restaurantRegister);
router.post('/register',upLoadImage('restaurants'), restaurantControllers.addRestaurant);
router.get('/login', restaurantControllers.viewLogin);
router.post('/login', restaurantControllers.login);

module.exports = router;
