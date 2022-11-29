var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");

//Require controller
var semesterRegistration = require('../controllers/semesterRegistration.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 


router.get("/:groupid/semesterRegistration/", [authjwt.verifyToken], semesterRegistration.findAll);

//router.get('/lessons/:id', [authjwt.verifyToken], semesterRegistration.findOne);
 
module.exports = router;