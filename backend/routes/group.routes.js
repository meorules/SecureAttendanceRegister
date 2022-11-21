var express = require('express');
var router = express.Router();
 
// Require controller.
var groupController = require('../controllers/group.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
 res.json({message: "Welcome to the Attendance api."});
});
 

// Retrieve all groups.
router.get("/groups/", groupController.findAll);

// Retrieve one group.
router.post("/groups/:id", groupController.findOne);
 
module.exports = router;