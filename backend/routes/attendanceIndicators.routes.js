var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");

// Require controller.
var attendanceIndicatorsController = require('../controllers/attendanceIndicators.controller');

// Retrieve all groups.
router.get("/:groupid/attendanceIndicators/", [authjwt.verifyToken], attendanceIndicatorsController.findAll);

router.get("/:groupid/attendanceIndicators/:studentid", [authjwt.verifyToken], attendanceIndicatorsController.findAttendance);


module.exports = router;