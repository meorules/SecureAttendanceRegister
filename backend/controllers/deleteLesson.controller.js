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
            res.status(500).send({
                message: lessonErr || "Some error occurred while retrieving the lesson."
            });
        } else {
            for (let i = 0; i < lessonReturned.attendance.length; i++) {
                Attendance.deleteOne({ _id: lessonReturned.attendance[i] })
                    .catch(deleteErr => console.log(deleteErr));
            }
            Lesson.deleteOne({ _id: lessonReturned })
                .catch(deleteErr => console.log(deleteErr));

            res.status(200).send({ message: "Lesson has been deleted" });

            Group.findByIdAndUpdate(group, { $pull: { lesson } })
                .catch(deleteErr => console.log(deleteErr));

        }
    })

}


exports.findAll = async (req, res) => {

    let id = req.params.groupid;
    const group = await Group.findById( id);

    console.log("lesson")

   const lessons = await Lesson.find({_id: {$in: group.lessons} })
    
   res.send(lessons)
}