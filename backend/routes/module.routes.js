var express = require('express');
var router = express.Router();
 
//Require controller
var moduleController = require('../controllers/module.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 

// Retrieve all animals.
router.get("/modules/", moduleController.findAll);

// Retrieve one animal.
router.post("/modules/", moduleController.findOne);
 
module.exports = router;