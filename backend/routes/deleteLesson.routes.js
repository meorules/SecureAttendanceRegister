var express = require('express');
var router = express.Router();

// Require controller.
var deleteLessonController = require('../controllers/deleteLesson.controller');
var studentLesson = require('../controllers/studentLesson.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});

//  DELETE request to delete a lesson object in the db
router.delete("/:groupid/deleteLesson/:lessonid", deleteLessonController.delete);

router.get("/:groupid/deleteLesson/", studentLesson.findAll);


module.exports = router;