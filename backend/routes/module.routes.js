var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
 
//Require controller
var moduleController = require('../controllers/module.controller');



// Retrieve all modules
router.get("/modules/", [authjwt.verifyToken], moduleController.findAll);

// Retrieve one modules.
router.get('/modules/:id', [authjwt.verifyToken], moduleController.findOne);
 
module.exports = router;