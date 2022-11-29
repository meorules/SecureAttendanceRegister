const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;
const User = db.users;

// Find all Attendance.
exports.delete = async(req, res) => {
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
        lesson = req.params.lessonid;
        group = req.params.groupid;

        Lesson.findById(lesson, function(lessonErr, lessonReturned) {
            if (lessonErr) {
                res.status(500).send({
                    message: lessonErr || "Some error occurred while retrieving the lesson."
                });
            } else {
                for (let i = 0; i < lessonReturned.attendance.length; i++) {
                    Attendance.deleteOne({ _id: lessonReturned.attendance[i] })
                        .catch(deleteErr => res.status(500).send({
                            message: deleteErr || "Some error occurred while retrieving the lesson."
                        }));
                }
                Lesson.deleteOne({ _id: lessonReturned })
                    .catch(deleteErr => res.status(500).send({
                        message: deleteErr || "Some error occurred while retrieving the lesson."
                    }));

                res.status(200).send({ message: "Lesson has been deleted" });

                Group.findByIdAndUpdate(group, { $pull: { lesson } })
                    .catch(deleteErr => res.status(500).send({
                        message: deleteErr || "Some error occurred while retrieving the lesson."
                    }));

            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "There was an error trying to find a lesson."
            });
        })
    }
}


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