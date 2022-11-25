const { lessons } = require("../models");
const db = require("../models");
const attendance = require("../models/attendance");
var ObjectId = require('mongodb').ObjectId;
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;



exports.findAll = async (req, res) => {

    let id = req.params.groupid;
    const group = await Group.findById(id);

    console.log("attendance")

   const lessons = await Lesson.find({_id: {$in: group.lessons} })

   let attendanceArray = [];
    
   lessons.forEach(lesson => {
    for(let i = 0; i < lesson.attendance.length; i++)
    {
        attendanceArray.push(lesson.attendance[i])
    } 
   });

    const attendance = await Attendance.find({_id: {$in: attendanceArray },student: req.params.studentid})

   res.send(attendance)
}