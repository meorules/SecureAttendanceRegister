const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;

// Find all Attendance. 
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    group = req.params.groupid;
    lessonDate = req.body.date;

    Group.find({ _id: group }, function(groupErrs, updatedGroup) {
        if (groupsErrs) {
            console.log(groupErrs);
        } else {
            Lesson.create({ date: lessonDate }, function(lessonErrs, newLesson) {
                    Group.findByIdAndUpdate(group, { $push: { lessons: newLesson } }, { new: true, useFindAndModify: false });
                    for (let i = 0; i < updatedGroup.students.length; i++) {
                        Attendances.create({ student: updatedGroup.students[i] }, function(attenErr, attenCreated) {
                            if (attenErr) {
                                console.log(attenErr);
                            } else {
                                Lesson.findByIdAndUpdate(newLesson, { $push: { attendance: attenCreated } }, { new: true, useFindAndModify: false })
                                    .catch(err2 => console.log(err2));
                            }
                        })
                    }
                })
                .then(result => {
                    res.status(200).send({ lessonid: newLesson._id });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Lesson."
                    });
                })

        }
    })
}