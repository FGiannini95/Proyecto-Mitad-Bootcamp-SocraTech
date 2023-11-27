var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');


router.get('/',indexControllers.viewHome);
router.get('/about', indexControllers.viewABout);
router.get('/contact', indexControllers.viewContact);
module.exports = router;
