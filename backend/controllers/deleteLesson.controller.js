const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;

// Find all Attendance.
exports.delete = (req, res) => {
    lesson = req.params.lessonid;
    group = req.params.groupid;

    Lesson.findById(lesson, function(lessonErr, lessonReturned) {
        if (lessonErr) {
            //console.log(lessonErr);
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
    })

}


exports.findAll = async(req, res) => {

    let id = req.params.groupid;
    const group = await Group.findById(id);

    const lessons = await Lesson.find({ _id: { $in: group.lessons } })

    res.send(lessons)
}