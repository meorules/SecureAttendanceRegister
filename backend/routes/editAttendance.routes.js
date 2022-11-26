var express = require('express');
var router = express.Router();

// Require controller.
// var groupController = require('../controllers/group.controller');
var editAttendanceController = require('../controllers/editAttendance.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});


router.post("/:groupid/editAttendance/:attendanceid/:attendanceValue", editAttendanceController.put);

router.get("/:groupid/editAttendance/", editAttendanceController.findAll);

router.get("/:groupid/editAttendance/:lessonid", editAttendanceController.findAttendance);

router.get("/:groupid/editAttendance/:lessonid/students", editAttendanceController.findStudents);

module.exports = router;