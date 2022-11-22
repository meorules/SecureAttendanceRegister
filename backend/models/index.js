const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const db = {};
var ObjectId = require('mongodb').ObjectId; 

mongoose.Promise = global.Promise;

mongoose.set('setDefaultsOnInsert', true);
db.mongoose = mongoose;
db.url = dbConfig.url;


db.animals = require("./animal.model.js")(mongoose);
db.users = require("./user.js")(mongoose);

db.attendances = require("./attendance.js")(mongoose);
db.courses = require("./course.js")(mongoose);
db.groups = require("./group.js")(mongoose);
db.lessons = require("./lesson.js")(mongoose);
db.modules = require("./module.js")(mongoose);

db.lecturers = require("./UserTypes/lecturer.js")(mongoose);
db.students = require("./UserTypes/student.js")(mongoose);
//db.academicadvisors = require("./UserTypes/academicadvisor.js")(mongoose);
//db.courseleaders = require("./UserTypes/courseleader.js")(mongoose);

let dummyData = require("../populatedummydb")(db);
//dummyData();

// if (db.users != undefined) {
//     if (db.users.count() == 0) {
//         dummyData();
//     }
// }

module.exports = db;


