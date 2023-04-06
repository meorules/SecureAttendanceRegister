var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
 
// Require controller.
var groupController = require('../controllers/group.controller');
 
// Retrieve one group.
router.get("/:id", [authjwt.verifyToken], groupController.findOne);

router.get("/:id", [authjwt.verifyToken], groupController.findGroup);
 
module.exports = router;