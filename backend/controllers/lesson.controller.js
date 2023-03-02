const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;
const User = db.users;

// Create a lesson 
exports.create = async(req, res) => {
    let userid = req.userId;

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


exports.delete = async(req, res) => {
    let userid = req.userId;
    await User.findById(userid).then(user =>{
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
    
                    Group.findByIdAndUpdate(group, { $pull: { lesson } })
                        .catch(deleteErr => res.status(500).send({
                            message: deleteErr || "Some error occurred while retrieving the lesson."
                        }));
                    res.status(200).send({ message: "Lesson has been deleted" });
    
                }
            })
    
        }
    })
    
    .catch(err => {
        res.status(500).send({
            message: err || "There was an error trying to find a user."
        });
    });
    
}


exports.findAll = async(req, res) => {
    let userid = req.userId;

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