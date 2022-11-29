var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
 
// Require controller.
var groupController = require('../controllers/group.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 
// Retrieve one group.
router.get("/:id", [authjwt.verifyToken], groupController.findOne);

router.get("/:id", [authjwt.verifyToken], groupController.findGroup);
 
module.exports = router;