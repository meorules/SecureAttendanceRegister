const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Module = db.modules;
const Group = db.groups;
const Lesson = db.lessons;

// Find all Attendance.
exports.findAll = async (req, res) => {
    let id = req.params.groupid;
    console.log("req.params.groupid" + req.params.groupid);
    const group = await Group.findById( id);
    Lesson
    .find({_id: {$in: group.lessons} })
    .then(data => {
      console.log(data)
      console.log("hi")
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Modules."
      });
    });
};