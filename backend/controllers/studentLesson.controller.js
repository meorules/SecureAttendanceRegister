const { lessons } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;



exports.findAll = async (req, res) => {

    let id = req.params.groupid;
    const group = await Group.findById( id);

    console.log("lesson")

   const lessons = await Lesson.find({_id: {$in: group.lessons} })
    
   res.send(lessons)
}