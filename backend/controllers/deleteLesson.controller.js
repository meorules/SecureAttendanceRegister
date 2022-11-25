const { mongoose } = require("../models");
const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Module = db.modules;
const Group = db.groups;
const Lesson = db.lessons;

// Find all Attendance.
exports.findAll = (req, res) => {
    const moduleName = req.query.name;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = moduleName ? { name: { $regex: new RegExp(moduleName), $options: "i" } } : {};
    Module
        .find(condition)
        .then(data => {
            //res.render('animals',
            //  {title: 'Pet Store',
            //   animals: data});
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Modules."
            });
        });
}

// Find one Attendance.
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