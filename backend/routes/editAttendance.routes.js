var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
// Require controller.
// var groupController = require('../controllers/group.controller');
var editAttendanceController = require('../controllers/editAttendance.controller');



router.put("/:groupid/editAttendance/:lessonid/:attendanceid/:attendanceValue", [authjwt.verifyToken], editAttendanceController.put);

router.get("/:groupid/editAttendance/", [authjwt.verifyToken], editAttendanceController.findAll);

router.get("/:groupid/editAttendance/:lessonid", [authjwt.verifyToken], editAttendanceController.findAttendance);

router.get("/:groupid/editAttendance/:lessonid/students", [authjwt.verifyToken], editAttendanceController.findStudents);

module.exports = router;