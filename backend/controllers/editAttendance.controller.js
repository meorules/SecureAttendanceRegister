const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Module = db.modules;
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;

// Edit a lesson
exports.put = async(req, res) => {

    attendance = req.params.attendanceid;
    newAttendanceValue = req.params.attendanceValue;

    Attendance.findByIdAndUpdate(attendance, { $set: { attendanceValue: newAttendanceValue } }, { new: true, useFindAndModify: false })
        .then(result => {
            res.status(200).send({
                result
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err || "Some error occurred while editing attendance"
            })
        })

};