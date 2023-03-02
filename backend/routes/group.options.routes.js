var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
// Require controller.
// var groupController = require('../controllers/group.controller');
var groupOptionsController = require('../controllers/group.options.controller');



router.get('/',[authjwt.verifyToken], groupOptionsController.findOne);



module.exports = router;