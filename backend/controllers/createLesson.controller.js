const { mongoose } = require("../models");
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;

// Find all Attendance. 
exports.create = (req, res) => {
    group = req.params.groupid;
    lessonDate = req.params.date + " " + req.params.time;
    //console.log(lessonDate)
    //console.log(req.params.time)

    Group.find({ _id: group }, function(groupErrs, updatedGroups) {
        if (groupErrs) {
            //console.log(groupErrs);
            res.status(500).send({
                message: groupErrs || "Some error occurred while creating the Lesson."
            });
        } else {
            updatedGroup = updatedGroups[0];
            Lesson.create({ date: lessonDate }, function(lessonErrs, newLesson) {
                if (lessonErrs) {
                    //console.log(lessonErrs);
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
                                //console.log(attenErr);
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