const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Module = db.modules;
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;
const Student = db.students

// Edit a lesson
exports.put = async(req, res) => {

    attendance = req.params.attendanceid;
    newAttendanceValue = req.params.attendanceValue;

    Attendance.findByIdAndUpdate(attendance, { $set: { attendanceValue: newAttendanceValue } }, { new: true, useFindAndModify: false })
        .then(result => {
            res.status(200).send("DONE");
        })
        .catch(err => {
            res.status(500).send({
                message: err || "Some error occurred while editing attendance"
            })
        })

};

exports.findAll = async (req, res) => {

    let id = req.params.groupid;
    const group = await Group.findById(id);

    console.log("attendance")

   const lessons = await Lesson.find({_id: {$in: group.lessons} })
    console.log("not dead")
   res.send(lessons)
}

exports.findAttendance = async (req, res) => {



   const lesson = await Lesson.findById(req.params.lessonid)


    const attendance = await Attendance.find({_id: {$in: lesson.attendance }})

   res.send(attendance)
}

exports.findStudents = async (req, res) => {
    console.log("bob")
    console.log(req.params.groupid)
    const group = await Group.findById(req.params.groupid)
    console.log("dead")
    const students = await Student.find({_id: {$in: group.students}})
    
    res.send(students)
 }