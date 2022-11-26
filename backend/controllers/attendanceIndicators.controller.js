const db = require("../models");
const group = require("../models/group");
const Group = db.groups;
const Student = db.students;
const Lesson = db.lessons;
const Attendance = db.attendances;

// Find all Attendance Indicators.
exports.findAll = async(req, res) => {
    let id = req.params.groupid;
    const group = await Group.findById(id).then(group => {
            Student
                .find({ _id: { $in: group.students } })
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving Attendance Indicators."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Attendance Indicators."
            });
        })
}

exports.findAttendance = async(req, res) => {

    let id = req.params.groupid;
    const group = await Group.findById(id)
        .catch(err2 => res.status(500).send({
            message: err2 || "Some error occurred while creating the attendance."
        }));

    const lessons = await Lesson.find({ _id: { $in: group.lessons } }).catch(err2 => res.status(500).send({
        message: err2 || "Some error occurred while creating the attendance."
    }));

    let attendanceArray = [];
    lessons.forEach(lesson => {
        for (let i = 0; i < lesson.attendance.length; i++) {
            attendanceArray.push(lesson.attendance[i])
        }
    });

    const attendances = await Attendance.find({ _id: { $in: attendanceArray }, student: req.params.studentid }).catch(err2 => res.status(500).send({
        message: err2 || "Some error occurred while retreiving the attendance for a student"
    }));

    let attended = 0;
    let late = 0;
    let notAttended = 0;
    let excused = 0;
    //0 for not attended, 1 for attended, 2 for excused absence, 3 for late

    attendances.forEach(attendance => {
        if (attendance.attendanceValue == 0)
            notAttended++;
        else if (attendance.attendanceValue == 1)
            attended++;
        else if (attendance.attendanceValue == 2)
            excused++
            else if (attendance.attendanceValue == 3)
                late++;
    })
    let total = notAttended + attended + excused + late;

    notAttended = (notAttended / total * 100).toFixed(2);
    attended = (attended / total * 100).toFixed(2);
    excused = (excused / total * 100).toFixed(2);
    late = (late / total * 100).toFixed(2);

    let indicators = [];

    indicators.push(attended)
    indicators.push(notAttended)
    indicators.push(excused)
    indicators.push(late)

    res.send(indicators)
}