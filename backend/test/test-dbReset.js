const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const db = {};

mongoose.Promise = global.Promise;

mongoose.set('setDefaultsOnInsert', true);
db.mongoose = mongoose;
db.url = dbConfig.url;




runDelete = async db=>{
    await mongoose.connect(db.url);
    db.users = require("../models/user.js")(mongoose);
    db.attendances = require("../models/attendance.js")(mongoose);
    db.courses = require("../models/course.js")(mongoose);
    db.groups = require("../models/group.js")(mongoose);
    db.lessons = require("../models/lesson.js")(mongoose);
    db.modules = require("../models/module.js")(mongoose);
    db.lecturers = require("../models/UserTypes/lecturer.js")(mongoose);
    db.students = require("../models/UserTypes/student.js")(mongoose);
    db.userCreationlogs = require("./userCreation.js")(mongoose);
    db.attendanceChangeLogs = require("./attendanceChange.js")(mongoose);

    Users = db.users;
    Attendances = db.attendances;
    Courses = db.courses;
    Groups = db.groups;
    Lessons = db.lessons;
    Modules = db.modules;
    Lecturers = db.lecturers;
    Students = db.students;
    userCreationLogs = db.userCreationlogs;
    attendanceChangeLogs =  db.attendanceChangeLogs;

    await Attendances.deleteMany({}).then(function(err,attendanceDelete){
        if(err){
            console.log(err);
        }
        else{
            if(attendanceDelete.acknowledged){
            console.log("Attendance Successfully deleted");
            }
        }
    });
    await Lessons.deleteMany({}).then(function(err,lessonDelete){
        if(err){
            console.log(err);
        }
        else{
            if(lessonDelete.acknowledged){
            console.log("Lessons Successfully deleted");
            }
        }
    });
    await Groups.deleteMany({}).then(function(err,groupDelete){
        if(err){
            console.log(err);
        }
        else{
            if(groupDelete.acknowledged){
                console.log("Groups Successfully deleted");
            }
        }
    });
    await Modules.deleteMany({}).then(function(err,moduleDelete){
        if(err){
            console.log(err);
        }
        else{
            if(moduleDelete.acknowledged){
                console.log("Modules Successfully deleted");
            }
        }
    });
    await Lecturers.deleteMany({}).then(function(err,lecturerDelete){
        if(err){
            console.log(err);
        }
        else{
            if(lecturerDelete.acknowledged){
                console.log("Lecturers Successfully deleted");
            }
        }
    });
    await Students.deleteMany({}).then(function(err,studentDelete){
        if(err){
            console.log(err);
        }
        else{
            if(studentDelete.acknowledged){
                console.log("Students Successfully deleted");
            }
        }
    });
    await Users.deleteMany({}).then(function(err,userDelete){
        if(err){
            console.log(err);
        }
        else{
            if(userDelete.acknowledged){
                console.log("Users Successfully deleted");
            }
        }
    });
    await Courses.deleteMany({}).then(function(err,courseDelete){
        if(err){
            console.log(err);
        }
        else{
            if(courseDelete.acknowledged){
                console.log("Courses Successfully deleted");
            }
        }
    });
    await userCreationLogs.deleteMany({}).then(function(err,creationLogDelete){
        if(err){
            console.log(err);
        }
        else{
            if(creationLogDelete.acknowledged){
                console.log("User Creation Logs Successfully deleted");
            }
        }
    });

    await attendanceChangeLogs.deleteMany({}).then(function(err,attendanceChangesLogsDelete){
        if(err){
            console.log(err);
        }
        else{
            if(attendanceChangesLogsDelete.acknowledged){
                console.log("Attendance Changes Logs Successfully deleted");
            }
        }
    });

}

runDelete(db);