const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const Module = db.modules;
const Group = db.groups;
const User = db.users;
const jwt = require('jsonwebtoken');

const Lecturer = db.lecturers
const Student = db.students

const config = require("../config/auth.config.js");


// Find all Modules.
exports.findAll = async (req, res) => {
    
    let token = req.header('x-access-token')

    const userid = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorised!" });
        }
        return req.userId = decoded.id;
        
      });
    
    const user = await User.findById(userid);
    let details;

    if (user.roleType == 0){
        details = await Student
        .findOne({username: user.username})
    }
    else if (user.roleType == 1){
        details = await Lecturer
        .findOne({username: user.username})
    }
    console.log(details)

    Module
        .find({_id: { $in: details.modules}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Modules."
            });
        });
}

exports.findOne = (req, res) => {
    let id = req.params.id;
    
    Group
        .find({ module: id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                message: err.message || "Some error occurred while retrieving Modules."
            });
        });
};