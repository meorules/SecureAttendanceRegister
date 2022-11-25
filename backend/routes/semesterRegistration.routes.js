var express = require('express');
var router = express.Router();
 
//Require controller
var semesterRegistration = require('../controllers/semesterRegistration.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 

// Retrieve all animals.
router.get("/:groupid/semesterRegistration/", semesterRegistration.findAll);

// Retrieve one animal.
router.get('/lessons/:id', semesterRegistration.findOne);
 
module.exports = router;