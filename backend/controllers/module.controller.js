const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Module = db.modules;
const Group = db.groups;
const User = db.users;


const Lecturer = db.lecturers
const Student = db.students




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

exports.findOne = async (req, res) => {
    let id = req.params.id;
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
        Group
        .find({ module: id,students:{$in: details._id} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                message: err.message || "Some error occurred while retrieving Modules."
            });
        });
    }
    else if (user.roleType == 1){
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
    }

};