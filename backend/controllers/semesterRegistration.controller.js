const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const Student = db.students;
const User = db.users;


// Find all Semester Registration.
exports.findAll = async(req, res) => {
    let id = req.params.groupid;

    const group = await Group.findById(id).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error trying to find a group."
        });
    });
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
    let details;

    if (user.roleType == 0) {
        details = await Student
            .findOne({ username: user.username }).catch(err => {
                res.status(500).send({
                    message: err.message || "There was an error trying to find a student."
                });
            })

        Student
            .find({ _id: { $in: group.students }, _id: details._id })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving a student."
                });
            });
    } else if (user.roleType == 1) {

        Student
            .find({ _id: { $in: group.students } })
            .then(data => {

                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Modules."
                });
            });
    }

}

// Find one Semester Registration.
exports.findOne = (req, res) => {
    let id = req.params.id;

    Lesson
        .find({ _id: id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                message: err.message || "Some error occurred while retrieving a lesson."
            });
        });
};