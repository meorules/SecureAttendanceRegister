module.exports = async db => {

    //Currently adds two courses, 6 modules in the Computer Science Course, 15 students, 9 lecturers, 1 course leader and 18 groups
    //Assigns all students to the course and various lecturers to be both module leaders and normal lecturers in the module
    //This 
    Users = db.users;
    Attendances = db.attendances;
    Courses = db.courses;
    Groups = db.groups;
    Lessons = db.lessons;
    Modules = db.modules;
    Lecturers = db.lecturers;
    Students = db.students;

    await Courses.insertMany([{
            courseName: "BSc Computer Science",
            courseCode: "CS202348"
        }, {
            courseName: "Jewellery & Metallurgy",
            courseCode: "JM2830820"
        }], //Courses added, now to add modules
        function(courseErr, courseCollection) {
            if (courseErr) {
                console.log(courseErr);
            } else {
                Modules.insertMany([{ moduleName: "CAPS", moduleCode: "CAPS-2782" }, { moduleName: "SAD", moduleCode: "SAD-2321" }, { moduleName: "AdvancedProgamming", moduleCode: "ADVP-2812" }, { moduleName: "ADS", moduleCode: "ADS-2931" }, { moduleName: "AI&ML", moduleCode: "AIML-2813" }, { moduleName: "MATH", moduleCode: "MATH-1831" }],
                    function(moduleErr, moduleCollection) {
                        if (moduleErr) {
                            console.log(err);
                        } else {
                            //Modules added, adding modules into the course
                            for (counter in moduleCollection) {
                                Courses.findByIdAndUpdate(courseCollection[0]._id, { $push: { modules: moduleCollection[counter]._id } }, { new: true, useFindAndModify: false })
                                    //.then(result2 => console.log(result2))
                                    .catch(err2 => console.log(err2));
                            }

                            Students.insertMany([{ firstName: "Mazen", lastName: "Omar", username: "mo190201" }, { firstName: "Tiger", lastName: "Foster", username: "tf2312201" }, { firstName: "Ward", lastName: "Royle", username: "wr2837312" }, { firstName: "Arthur", lastName: "Finn", username: "af2323831" }, { firstName: "Silvester", lastName: "Kodey", username: "sk2872871" }, { firstName: "Godfrey", lastName: "Lamar", username: "gl28738273" }, { firstName: "Erick", lastName: "Kermit", username: "ek32738738" }, { firstName: "Foster", lastName: "Russell", username: "fr2982981" }, { firstName: "Tristan", lastName: "Deon", username: "td28739827" }, { firstName: "Jerrold", lastName: "Sage", username: "js2718728" }, { firstName: "Joe", lastName: "Ross", username: "jr28737821" }, { firstName: "Kieran", lastName: "Cole", username: "kc28378273" }, { firstName: "Gus", lastName: "Cyan", username: "gc28738271" }, { firstName: "Tommy", lastName: "Sacheverell", username: "ts28738271" }, { firstName: "Ernie", lastName: "Reid", username: "er2872817387" }],
                                function(studentErr, studentCollection) {
                                    if (studentErr) {
                                        console.log(studentErr);
                                    } else {
                                        for (counter in studentCollection) {
                                            Students.findByIdAndUpdate(studentCollection[counter]._id, { $set: { course: courseCollection[0] } }, { new: true, useFindAndModify: false })
                                                //.then(result2 => console.log(result2))
                                                .catch(err2 => console.log(err2));
                                        }
                                        for (counter in studentCollection) {
                                            Courses.findByIdAndUpdate(courseCollection[0]._id, { $push: { students: studentCollection[counter] } }, { new: true, useFindAndModify: false })
                                                //.then(result2 => console.log(result2))
                                                .catch(err2 => console.log(err2));
                                        }


                                        //Inserting lecturers
                                        Lecturers.insertMany([{ firstName: "Tom", lastName: "Hodgkins", username: "th29498382" }, { firstName: "Chris", lastName: "Deam", username: "cd7484758" }, { firstName: "Lantana", lastName: "Hewitt", username: "lh383847372" }, { firstName: "Shaun", lastName: "Terrance", username: "st29498382" }, { firstName: "Tommy", lastName: "Kay", username: "tk37384738" }, { firstName: "Traci", lastName: "Elissa", username: "te323382" }, { firstName: "Connell", lastName: "Mabelle", username: "cm2098309" }, { firstName: "Madge", lastName: "Gerald", username: "mg29432323" }, { firstName: "Enid", lastName: "Reagan", username: "er398309283" }], function(lecturerErr, lecturerCollection) {
                                            if (lecturerErr) {
                                                console.log(lecturerErr);
                                            } else {
                                                //Setting course leader
                                                Courses.findByIdAndUpdate(courseCollection[0]._id, { $set: { courseLeader: lecturerCollection[0] } }, { new: true, useFindAndModify: false })
                                                    //.then(result2 => console.log(result2))
                                                .catch(err2 => console.log(err2));

                                                //Adding all modules to the course leader
                                              for (let i = 0; i < moduleCollection.length; i++) {
                                                Lecturers.findByIdAndUpdate(lecturerCollection[0]._id, { $push: { modules: moduleCollection[i] } }, { new: true, useFindAndModify: false })
                                                  //.then(result2 => console.log(result2))
                                                  .catch(err2 => console.log(err2));
                                              }
                                                //Adding lecturers to the various modules and making one of them module leader
                                                for (let i = 0; i < moduleCollection.length; i++) {
                                                    Modules.findByIdAndUpdate(moduleCollection[i]._id, { $set: { moduleLeader: lecturerCollection[i + 1] } }, { new: true, useFindAndModify: false })
                                                        //.then(result2 => console.log(result2))
                                                        .catch(err2 => console.log(err2));
                                                    Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { teachingLecturers: lecturerCollection[i + 1] } }, { new: true, useFindAndModify: false })
                                                        //.then(result2 => console.log(result2))
                                                        .catch(err2 => console.log(err2));
                                                    Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { teachingLecturers: lecturerCollection[i + 2] } }, { new: true, useFindAndModify: false })
                                                        //.then(result2 => console.log(result2))
                                                        .catch(err2 => console.log(err2));
                                                    Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { teachingLecturers: lecturerCollection[i + 3] } }, { new: true, useFindAndModify: false })
                                                        //.then(result2 => console.log(result2))
                                                        .catch(err2 => console.log(err2));
                                                    Lecturers.findByIdAndUpdate(lecturerCollection[i + 1], { $push: { modules: moduleCollection[i] } }, { new: true, useFindAndModify: false })
                                                        //.then(result2 => console.log(result2))
                                                        .catch(err2 => console.log(err2));
                                                    Lecturers.findByIdAndUpdate(lecturerCollection[i + 2], { $push: { modules: moduleCollection[i] } }, { new: true, useFindAndModify: false })
                                                        //.then(result2 => console.log(result2))
                                                        .catch(err2 => console.log(err2));

                                                    Lecturers.findByIdAndUpdate(lecturerCollection[i + 3], { $push: { modules: moduleCollection[i] } }, { new: true, useFindAndModify: false })
                                                        //.then(result2 => console.log(result2))
                                                        .catch(err2 => console.log(err2));
                                                }
                                                
                                                //Adding groups
                                                Groups.insertMany([{ groupName: "CAPSLecture" }, { groupName: "CAPSTutorial1", groupType: 1 }, { groupName: "CAPSTutorial2", groupType: 1 }, { groupName: "SADLecture" }, { groupName: "SADTutorial1", groupType: 1 }, { groupName: "SADTutorial2", groupType: 1 }, { groupName: "AVDPLecture" }, { groupName: "ADVPTutorial1", groupType: 1 }, { groupName: "ADVPTutorial2", groupType: 1 }, { groupName: "ADSLecture" }, { groupName: "ADSTutorial1", groupType: 1 }, { groupName: "ADSTutorial2", groupType: 1 }, { groupName: "AIMLLecture" }, { groupName: "AIMLTutorial1", groupType: 1 }, { groupName: "AIMLTutorial2", groupType: 1 }, { groupName: "MATHLecture" }, { groupName: "MATHTutorial1", groupType: 1 }, { groupName: "MATHTutorial2", groupType: 1 }],
                                                    function(groupsErr, groupCollection) {
                                                        if (groupsErr) {
                                                            console.log(groupErr);
                                                        } else {
                                                            let j = 0;
                                                            //Adding the groups to the modules and making sure the module is also saved on the group
                                                            for (let i = 0; i < moduleCollection.length; i++) {
                                                                Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { groups: groupCollection[j] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { groups: groupCollection[j + 1] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { groups: groupCollection[j + 2] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Groups.findByIdAndUpdate(groupCollection[j]._id, { $set: { module: moduleCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Groups.findByIdAndUpdate(groupCollection[j + 1]._id, { $set: { module: moduleCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Groups.findByIdAndUpdate(groupCollection[j + 2]._id, { $set: { module: moduleCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                j += 3;
                                                            }
                                                            j = 0;
                                                            let k = 0;

                                                            //Adding students to groups and adding respective modules to the students
                                                            for (let i = 0; i < 5; i++) {
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j + 1] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j + 2] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 1 + (k % 2)]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 3]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 1 + (k % 2) + 3]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 6]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 1 + (k % 2) + 6]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                k++;

                                                            }
                                                            k = 3;
                                                            j = 3;
                                                            for (let i = 5; i < 10; i++) {
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j + 1] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j + 2] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 6]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 1 + (k % 2) + 6]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 9]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 1 + (k % 2) + 9]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 12]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 1 + (k % 2) + 12]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                k++;

                                                            }
                                                            j = 0;
                                                            for (let i = 10; i < 15; i++) {
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j + 2] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));
                                                                Students.findByIdAndUpdate(studentCollection[i]._id, { $push: { modules: moduleCollection[j + 5] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 1 + (k % 2)]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 6]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 6 + 1 + (k % 2)]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 15]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                Groups.findByIdAndUpdate(groupCollection[j + 15 + 1 + (k % 2)]._id, { $push: { students: studentCollection[i] } }, { new: true, useFindAndModify: false })
                                                                    //.then(result2 => console.log(result2))
                                                                    .catch(err2 => console.log(err2));

                                                                k++;

                                                            }

                                                            //Creating lessons
                                                            Lessons.insertMany([{ date: "2022-11-14 10:00:00" }, { date: "2022-11-21 10:00:00" }, { date: "2022-11-28 10:00:00" }, { date: "2022-11-15 10:00:00" }, { date: "2022-11-22 10:00:00" }, { date: "2022-11-29 10:00:00" }, { date: "2022-11-15 12:00:00" }, { date: "2022-11-22 12:00:00" }, { date: "2022-11-29 12:00:00" }, { date: "2022-11-14 12:00:00" }, { date: "2022-11-21 12:00:00" }, { date: "2022-11-28 12:00:00" }, { date: "2022-11-15 14:00:00" }, { date: "2022-11-22 14:00:00" }, { date: "2022-11-29 14:00:00" }, { date: "2022-11-15 16:00:00" }, { date: "2022-11-22 16:00:00" }, { date: "2022-11-29 16:00:00" }, { date: "2022-11-14 14:00:00" }, { date: "2022-11-21 14:00:00" }, { date: "2022-11-28 14:00:00" }, { date: "2022-11-14 16:00:00" }, { date: "2022-11-21 16:00:00" }, { date: "2022-11-28 16:00:00" }, { date: "2022-11-15 18:00:00" }, { date: "2022-11-22 18:00:00" }, { date: "2022-11-29 18:00:00" }, { date: "2022-11-16 10:00:00" }, { date: "2022-11-23 10:00:00" }, { date: "2022-11-30 10:00:00" }, { date: "2022-11-16 14:00:00" }, { date: "2022-11-23 14:00:00" }, { date: "2022-11-30 14:00:00" }, { date: "2022-11-16 16:00:00" }, { date: "2022-11-23 16:00:00" }, { date: "2022-11-30 16:00:00" }, { date: "2022-11-16 12:00:00" }, { date: "2022-11-23 12:00:00" }, { date: "2022-11-30 12:00:00" }, { date: "2022-11-16 18:00:00" }, { date: "2022-11-23 18:00:00" }, { date: "2022-11-30 18:00:00" }, { date: "2022-11-17 16:00:00" }, { date: "2022-11-24 16:00:00" }, { date: "2022-12-01 16:00:00" }, { date: "2022-11-18 12:00:00" }, { date: "2022-11-25 12:00:00" }, { date: "2022-12-02 12:00:00" }, { date: "2022-11-18 14:00:00" }, { date: "2022-11-25 14:00:00" }, { date: "2022-12-02 14:00:00" }, { date: "2022-11-18 16:00:00" }, { date: "2022-11-25 16:00:00" }, { date: "2022-12-02 16:00:00" }],
                                                                function(lessonsErr, LessonsCollection) {
                                                                    if (lessonsErr) {
                                                                        console.log(lessonsErr);
                                                                    } else {
                                                                        let j = 0;
                                                                        for (let i = 0; i < groupCollection.length; i++) {
                                                                            Groups.findByIdAndUpdate(groupCollection[i]._id, { $push: { lessons: LessonsCollection[j] } }, { new: true, useFindAndModify: false })
                                                                                //.then(result2 => console.log(result2))
                                                                                .catch(err2 => console.log(err2));
                                                                            Groups.findByIdAndUpdate(groupCollection[i]._id, { $push: { lessons: LessonsCollection[j + 1] } }, { new: true, useFindAndModify: false })
                                                                                //.then(result2 => console.log(result2))
                                                                                .catch(err2 => console.log(err2));
                                                                            Groups.findByIdAndUpdate(groupCollection[i]._id, { $push: { lessons: LessonsCollection[j + 2] } }, { new: true, useFindAndModify: false })
                                                                                //.then(result2 => console.log(result2))
                                                                                .catch(err2 => console.log(err2));
                                                                            j += 3;
                                                                        }

                                                                        //First half of groups is randomized, ( First 3 modules), 2nd half is not set
                                                                        //Creating Attendance for the various lessosn and students in each group
                                                                        Groups.find(function(groupErrs, updatedGroups) {
                                                                            if (groupErrs) {
                                                                                console.log(groupErrs);
                                                                            } else {
                                                                                for (let i = 0; i < updatedGroups.length; i++) {
                                                                                    for (let j = 0; j < updatedGroups[i].lessons.length; j++) {
                                                                                        for (let k = 0; k < updatedGroups[i].students.length; k++) {
                                                                                            if (i < (updatedGroups.length / 2)) {
                                                                                                randAtten = Math.floor(Math.random() * 3);
                                                                                                Attendances.create({ attendanceValue: randAtten, student: updatedGroups[i].students[k] },
                                                                                                    function(attenErr, attenCreated) {
                                                                                                        if (attenErr) {
                                                                                                            console.log(attenErr);
                                                                                                        } else {
                                                                                                            Lessons.findByIdAndUpdate(updatedGroups[i].lessons[j], { $push: { attendance: attenCreated } }, { new: true, useFindAndModify: false })
                                                                                                                //.then(result2 => console.log(result2))
                                                                                                                .catch(err2 => console.log(err2));
                                                                                                        }
                                                                                                    })
                                                                                            } else {
                                                                                                Attendances.create({ student: updatedGroups[i].students[k] },
                                                                                                    function(attenErr, attenCreated) {
                                                                                                        if (attenErr) {
                                                                                                            console.log(attenErr);
                                                                                                        } else {
                                                                                                            Lessons.findByIdAndUpdate(updatedGroups[i].lessons[j], { $push: { attendance: attenCreated } }, { new: true, useFindAndModify: false })
                                                                                                                //.then(result2 => console.log(result2))
                                                                                                                .catch(err2 => console.log(err2));
                                                                                                        }
                                                                                                    })
                                                                                            }

                                                                                        }
                                                                                    }



                                                                                }
                                                                            }
                                                                        })











                                                                    }
                                                                })
                                                        }


                                                    })

                                            }
                                        })
                                    }
                                });
                        }
                    })
            }
        })



    //Inserting in the various user profiles
  Users.insertMany([{ username: "mo190201", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "tf2312201", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "wr2837312", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "af2323831", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "sk2872871", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "gl28738273", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "ek32738738", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "fr2982981", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "td28739827", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "js2718728", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "jr28737821", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "kc28378273", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "gc28738271", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "ts28738271", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "er2872817387", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu" }, { username: "th29498382", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "cd7484758", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "lh383847372", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "st29498382", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "tk37384738", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "te323382", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "cm2098309", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "mg29432323", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "er398309283", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 1 }, { username: "nb37121", password: "$2a$08$dwTtEDLrOLSrNZY.Nj08EO1dmuAiKlxzAGGNhQ1hA95hwcJbYJitu", roleType: 4 }], function(err, userCollection) {
        if (err) {
            console.log(err);
            console.log("Users insertion failed");
        } else {
            //console.log("Users correctly inserted");
        }
    });

    return 1;
};