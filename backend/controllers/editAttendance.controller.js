const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;
const Student = db.students
const User = db.users

// Edit a lesson
exports.put = async(req, res) => {
    let token = req.header('x-access-token')

    const userid = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorised!" });
        }
        return req.userId = decoded.id;

    });

    const user = await User.findById(userid).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error trying to find a user."
        });
    });

    if (user.roleType == 0) {
        res.status(401).send({ message: "Unauthorised!" });
    } else if (user.roleType == 1) {
        let newAttendanceValue = null;

        if (req.params.attendanceValue == "Not-Attended") {
            newAttendanceValue = 0;
        } else if (req.params.attendanceValue == "Attended") {
            newAttendanceValue = 1;
        } else if (req.params.attendanceValue == "Excused") {
            newAttendanceValue = 2;
        } else if (req.params.attendanceValue == "Late") {
            newAttendanceValue = 3;
        } else {
            res.status(400).send({ message: "Invalid Attendance Value" });
        }

        attendance = req.params.attendanceid;

        Attendance.findByIdAndUpdate(attendance, { $set: { attendanceValue: newAttendanceValue } }, { new: true, useFindAndModify: false })
            .then(result => {
                res.status(200).send({
                    result
                });
            })
            
    }

};

exports.findAll = async(req, res) => {
    let token = req.header('x-access-token')

    const userid = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorised!" });
        }
        return req.userId = decoded.id;

    });

    const user = await User.findById(userid).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error trying to find a user."
        });
    });

    if (user.roleType == 0) {
        res.status(401).send({ message: "Unauthorised!" });
    } else if (user.roleType == 1) {
        let id = req.params.groupid;
        const group = await Group.findById(id).catch(err => {
            res.status(500).send({
                message: err.message || "There was an error trying to find a group."
            });
        });


        const lessons = await Lesson.find({ _id: { $in: group.lessons } }).catch(err => {
            res.status(500).send({
                message: err.message || "There was an error trying to find lessons."
            });
        })

        res.send(lessons)
    }
}

exports.findAttendance = async(req, res) => {

    let token = req.header('x-access-token')

    const userid = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorised!" });
        }
        return req.userId = decoded.id;

    });

    const user = await User.findById(userid).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error trying to find a user."
        });
    });
    let details;

    if (user.roleType == 0) {
        res.status(401).send({ message: "Unauthorised!" });
    } else if (user.roleType == 1) {
        const lesson = await Lesson.findById(req.params.lessonid).catch(err => {
            res.status(500).send({
                message: err.message || "There was an error trying to find a lesson."
            });
        })

        const attendance = await Attendance.find({ _id: { $in: lesson.attendance } }).catch(err => {
            res.status(500).send({
                message: err.message || "There was an error trying to find attendance records."
            });
        })

        res.send(attendance)
    }

}

exports.findStudents = async(req, res) => {

    const group = await Group.findById(req.params.groupid).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error trying to find a group."
        });
    })

    const students = await Student.find({ _id: { $in: group.students } }).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error trying to finds."
        });
    })

    res.send(students)
}