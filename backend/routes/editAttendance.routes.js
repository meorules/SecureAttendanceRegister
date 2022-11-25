var express = require('express');
var router = express.Router();

// Require controller.
// var groupController = require('../controllers/group.controller');
var editAttendanceController = require('../controllers/editAttendance.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});


router.get("/:groupid/editAttendance/", editAttendanceController.findAll);


module.exports = router;