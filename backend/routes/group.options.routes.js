var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
// Require controller.
// var groupController = require('../controllers/group.controller');
var groupOptionsController = require('../controllers/group.options.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});

router.get('/',[authjwt.verifyToken], groupOptionsController.findOne);



module.exports = router;