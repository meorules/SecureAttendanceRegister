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

    const user = await User.findById(userid);

    if (user.roleType == 0) {
        res.status(401).send({ message: "Unauthorised!" });
    } else if (user.roleType == 1) {
        let newAttendanceValue = null;

        if (req.params.attendanceValue == "Not-Attended") {
            newAttendanceValue = 0;
        } else if (req.params.attendanceValue == "Attended") {
            newAttendanceValue = 1;
        } else if (req.params.attendanceValue == "Excused-Absence") {
            newAttendanceValue = 2;
        } else if (req.params.attendanceValue == "Late") {
            newAttendanceValue = 3;
        }


        console.log(req.params.attendanceid)
        attendance = req.params.attendanceid;
        console.log(attendance)


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

    const user = await User.findById(userid);

    if (user.roleType == 0) {
        res.status(401).send({ message: "Unauthorised!" });
    } else if (user.roleType == 1) {
        let id = req.params.groupid;
        const group = await Group.findById(id);


        const lessons = await Lesson.find({ _id: { $in: group.lessons } })

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

    const user = await User.findById(userid);
    let details;

    if (user.roleType == 0) {
        res.status(401).send({ message: "Unauthorised!" });
    } else if (user.roleType == 1) {
        const lesson = await Lesson.findById(req.params.lessonid)
        console.log("heydooooood")

        const attendance = await Attendance.find({ _id: { $in: lesson.attendance } })

        res.send(attendance)
    }

}

exports.findStudents = async(req, res) => {
    console.log("bob")
    console.log(req.params.groupid)
    const group = await Group.findById(req.params.groupid)
    console.log("dead")
    const students = await Student.find({ _id: { $in: group.students } })

    res.send(students)
}