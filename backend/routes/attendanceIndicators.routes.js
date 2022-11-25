var express = require('express');
var router = express.Router();

// Require controller.
var attendanceIndicatorsController = require('../controllers/attendanceIndicators.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});


// Retrieve all groups.
router.get("/:groupid/attendanceIndicators/", attendanceIndicatorsController.findAll);

router.get("/:groupid/attendanceIndicators/:studentid", attendanceIndicatorsController.findAttendance);


module.exports = router;