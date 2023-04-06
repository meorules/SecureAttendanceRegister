const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const db = {};

mongoose.Promise = global.Promise;

mongoose.set('setDefaultsOnInsert', true);
db.mongoose = mongoose;
db.url = dbConfig.url;


db.users = require("./user.js")(mongoose);

db.attendances = require("./attendance.js")(mongoose);
db.courses = require("./course.js")(mongoose);
db.groups = require("./group.js")(mongoose);
db.lessons = require("./lesson.js")(mongoose);
db.modules = require("./module.js")(mongoose);

db.lecturers = require("./UserTypes/lecturer.js")(mongoose);
db.students = require("./UserTypes/student.js")(mongoose);

db.userCreationlogs = require("./userCreation.js")(mongoose);
db.attendanceChangeLogs = require("./attendanceChange.js")(mongoose);

// db.academicadvisors = require("./UserTypes/academicadvisor.js")(mongoose);
// db.courseleaders = require("./UserTypes/courseleader.js")(mongoose);

db.users.find(function(usersErr, Users) {
    if (usersErr) {
        console.log(usersErr);
    } else {
        if (Users.length == 0) {
            console.log("DATA to be added as there is none in the DB");
            //let resetDB = require("../test/test-dbReset");
            let dummyData = require("../populatedummydb")(db);
        } else {
            console.log("Users exist in the DB, so all dummy data is assumed as added in.");
        }
    }
});

module.exports = db;