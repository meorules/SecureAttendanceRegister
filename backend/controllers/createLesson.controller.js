const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const { mongoose } = require("../models");
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;
const User = db.users;

// Find all Attendance. 
exports.create = async(req, res) => {
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
        group = req.params.groupid;
        lessonDate = req.params.date + " " + req.params.time;

        Group.find({ _id: group }, function(groupErrs, updatedGroups) {
            if (groupErrs) {
                res.status(500).send({
                    message: groupErrs || "Some error occurred while creating the Lesson."
                });
            } else {
                updatedGroup = updatedGroups[0];
                Lesson.create({ date: lessonDate }, function(lessonErrs, newLesson) {
                    if (lessonErrs) {
                        res.status(500).send({
                            message: lessonErrs || "Some error occurred while creating the Lesson."
                        });
                    } else {
                        Group.findByIdAndUpdate(updatedGroup, { $push: { lessons: newLesson } }, { new: true, useFindAndModify: false })
                            .catch(err2 => res.status(500).send({
                                message: err2 || "Some error occurred while creating the attendance."
                            }));
                        for (let i = 0; i < updatedGroup.students.length; i++) {
                            Attendance.create({ student: updatedGroup.students[i] }, function(attenErr, attenCreated) {
                                if (attenErr) {
                                    res.status(500).send({
                                        message: attenErr || "Some error occurred while creating the attendance."
                                    });
                                } else {
                                    Lesson.findByIdAndUpdate(newLesson, { $push: { attendance: attenCreated } }, { new: true, useFindAndModify: false })
                                        .catch(err2 => res.status(500).send({
                                            message: err2 || "Some error occurred while creating the attendance."
                                        }));
                                }
                            })
                        }
                        res.status(200).send({ lessonid: newLesson._id });
                    }
                })
            }
        })
    }
}