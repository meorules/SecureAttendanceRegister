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
                console.log(lessonErr);
            } else {
                for (let i = 0; i < lessonReturned.attendance.length; i++) {
                    Attendance.deleteById(lessonReturned.attendance[i])
                        .catch(deleteErr => console.log(deleteErr));
                }
                Lesson.deleteById(lessonReturned)
                    .catch(deleteErr => console.log(deleteErr));

            }
            Group.findByIdAndUpdate(group, { $pull: { lesson } })
                .catch(deleteErr => console.log(deleteErr));

        })
        .then(result => {
            res.status(200).send({ message: "Lesson has been deleted" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the lesson."
            });
        });

}