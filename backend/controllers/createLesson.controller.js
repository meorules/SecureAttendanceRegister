const { mongoose } = require("../models");
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;

// Find all Attendance. 
exports.create = async (req, res) => {
    
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    group = req.params.groupid;
    lessonDate = req.params.date;
    console.log(lessonDate)
    console.log(req.params.time)

    Group.find({ _id: group }, function(groupErrs, updatedGroup) {
        if (groupErrs) {
            console.log(groupErrs);
            res.status(500).send({
                message: groupErrs  || "Some error occurred while creating the Lesson."
            });
        } else {
            Lesson.create({ date: lessonDate }, function(lessonErrs, newLesson) {
                if (lessonErrs) {
                    console.log(lessonErrs);
                    res.status(500).send({
                        message: lessonErrs  || "Some error occurred while creating the Lesson."
                    });
                } else {
                    Group.findByIdAndUpdate(group, { $push: { lessons: newLesson } }, { new: true, useFindAndModify: false }).catch(err2 => console.log(err2));
                    let length = updatedGroup[0].students.length;
                    for (let i = 0; i < length; i++) {
                        Attendance.create({ student: updatedGroup[0].students[i] }, function(attenErr, attenCreated) {
                            if (attenErr) {
                                console.log(attenErr);
                            } else {
                                Lesson.findByIdAndUpdate(newLesson, { $push: { attendance: attenCreated } }, { new: true, useFindAndModify: false })
                                    .catch(err2 => console.log(err2));
                            }
                        })
                    }
                    console.log(newLesson._id)
                    res.status(200).send({ lessonid: newLesson._id });
                }
            })
        }
    })
}