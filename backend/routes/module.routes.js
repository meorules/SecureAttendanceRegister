var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
 
//Require controller
var moduleController = require('../controllers/module.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 

// Retrieve all animals.
router.get("/modules/", [authjwt.verifyToken], moduleController.findAll);

// Retrieve one animal.
router.get('/modules/:id', moduleController.findOne);
 
module.exports = router;