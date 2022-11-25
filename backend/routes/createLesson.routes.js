var express = require('express');
var router = express.Router();

// Require controller.
// var groupController = require('../controllers/group.controller');
var createLessonController = require('../controllers/createLesson.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});

//  POST request to create a new lesson object in the db, then return it's id to the caller
router.post("/:groupid/createLesson/", createLessonController.create);

module.exports = router;