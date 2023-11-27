const express = require('express');
const router = express.Router();
const upLoadImage = require('../middlewares/multer');
const dishControllers = require('../controllers/dishControllers');
//const upLoadImage = require('../middlewares/multer');

router.get('/', dishControllers.showAllDishes);
router.get('/addDish/:id', dishControllers.viewAddDish);
router.post('/addDish/:id', upLoadImage('dishes'), dishControllers.addDish);
router.get('/deleteDish/:id/:restaurant_id', dishControllers.totalDeleteDish);
router.get('/oneDish/:id', dishControllers.viewOnedish);
router.get('/editDish/:id', dishControllers.showEditDish);
router.post('/editDish/:id', upLoadImage('dishes'), dishControllers.editDish);
router.get('/editDish/:id', dishControllers.showEditDish);
router.post('/editDish/:id', dishControllers.editDish);


module.exports = router;