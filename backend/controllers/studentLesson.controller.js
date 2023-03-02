const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const User = db.users;


exports.findAll = async(req, res) => {
    let userid = req.userId;

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