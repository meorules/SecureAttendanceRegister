const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Attendance = db.attendances;
const User = db.users;

// Find all Attendance.
exports.delete = async (req, res) => {
    let token = req.header('x-access-token')

    const userid = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorised!" });
        }
        return req.userId = decoded.id;
        
      });
    
    const user = await User.findById(userid);
    

    if (user.roleType == 0){
        res.status(401).send({ message: "Unauthorised!" });
    }
    else if (user.roleType == 1){
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
}


exports.findAll = async (req, res) => {
    let token = req.header('x-access-token')

    const userid = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorised!" });
        }
        return req.userId = decoded.id;
        
      });
    
    const user = await User.findById(userid);
    

    if (user.roleType == 0){
        res.status(401).send({ message: "Unauthorised!" });
    }
    else if (user.roleType == 1){
        let id = req.params.groupid;
        const group = await Group.findById( id);

       

        const lessons = await Lesson.find({_id: {$in: group.lessons} })
    
     res.send(lessons)
    }
}