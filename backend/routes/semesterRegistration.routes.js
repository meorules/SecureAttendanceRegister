var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");

//Require controller
var semesterRegistration = require('../controllers/semesterRegistration.controller');


router.get("/:groupid/semesterRegistration/", [authjwt.verifyToken], semesterRegistration.findAll);

//router.get('/lessons/:id', [authjwt.verifyToken], semesterRegistration.findOne);
 
module.exports = router;