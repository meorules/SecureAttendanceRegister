var express = require('express');
var router = express.Router();
const { authjwt } = require("../middlewares");
// Require controller.
// var groupController = require('../controllers/group.controller');
var lessonController = require('../controllers/lesson.controller.js');


//  POST request to create a new lesson object in the db, then return it's id to the caller
router.post("/:groupid/createLesson/:date/:time", [authjwt.verifyToken], lessonController.create);

//  DELETE request to delete a lesson object in the db
router.delete("/:groupid/deleteLesson/:lessonid",[authjwt.verifyToken], lessonController.delete);


// FIND ALL THE LESSONS AND GET THEM
router.get("/:groupid/deleteLesson/", [authjwt.verifyToken], lessonController.findAll);


module.exports = router;