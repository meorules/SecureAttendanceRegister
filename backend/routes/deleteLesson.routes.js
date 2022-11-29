var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
// Require controller.
var deleteLesson = require('../controllers/deleteLesson.controller');
var studentLesson = require('../controllers/studentLesson.controller');

// GET at the root returns a welcome message in json
router.get('/', function(req, res, next) {
    res.json({ message: "Welcome to the Attendance api." });
});

//  DELETE request to delete a lesson object in the db
router.delete("/:groupid/deleteLesson/:lessonid", deleteLesson.delete);

router.get("/:groupid/deleteLesson/", [authjwt.verifyToken], studentLesson.findAll);


module.exports = router;