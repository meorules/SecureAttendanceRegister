var express = require('express');
var router = express.Router();
 
//Require controller
var lessonController = require('../controllers/lessonAttendance.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 

// Retrieve all animals.
router.get("/lessons/", lessonController.findAll);

// Retrieve one animal.
router.get('/lessons/:id', lessonController.findOne);
 
module.exports = router;