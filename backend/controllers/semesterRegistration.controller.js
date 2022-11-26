const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Module = db.modules;
const Group = db.groups;
const Lesson = db.lessons;
const Student = db.students;

// Find all Semester Registration.
exports.findAll = async (req, res) => {
    let id = req.params.groupid;
 
  const group = await Group.findById( id);
  
  Student
  .find({_id: {$in: group.students} })
  .then(data => {
    console.log(data)
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Modules."
    });
  });
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
                message: err.message || "Some error occurred while retrieving Modules."
            });
        });
};