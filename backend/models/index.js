const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const dummyData = require("../populatedummydb")(mongoose);


mongoose.Promise = global.Promise;

mongoose.set('setDefaultsOnInsert', false);
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

if (mongoose.connection.db.collection('users').count() == 0) {
    console.log(dummyData());
}

//db.animals = require("./animal.model.js")(mongoose);
db.users = require("./user.js")(mongoose);

db.attendances = require("./attendance.js")(mongoose);
db.courses = require("./course.js")(mongoose);
db.groups = require("./group.js")(mongoose);
db.lessons = require("./lesson.js")(mongoose);
db.modules = require("./module.js")(mongoose);

db.lecturers = require("./UserTypes/lecturer.js")(mongoose);
db.students = require("./UserTypes/student.js")(mongoose);
// db.academicadvisors = require("./UserTypes/academicadvisor.js")(mongoose);
// db.courseleaders = require("./UserTypes/courseleader.js")(mongoose);




module.exports = db;