var express = require('express');
var router = express.Router();
 
//Require controller
var studentAttendance = require('../controllers/studentAttendance.controller');
var studentLesson = require('../controllers/studentLesson.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 

// Retrieve all animals.
router.get("/:groupid/semesterRegistration/:studentid", studentAttendance.findAll);

// Retrieve all animals.
router.get("/:groupid/semesterRegistration/:studentid/lesson", studentLesson.findAll);

module.exports = router;