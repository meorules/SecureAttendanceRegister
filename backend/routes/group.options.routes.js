var express = require('express');
var router = express.Router();

// Require controller.
// var groupController = require('../controllers/group.controller');
var groupOptionsController = require('../controllers/group.options.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});

// Retrieve one group.
// router.get("/:id", groupController.findOne, "/:groupid", groupOptionsController.findOneByID);

router.get(groupOptionsController.findOne);

// router.get('/', function(req, res, next) {
//     res.json(groupOptionsController.findOne(req.groupid));
// });

module.exports = router;