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
                                 Courses.findByIdAndUpdate(courseCollection[0]._id, { $push: { modules: moduleCollection[counter] } }, { new: true, useFindAndModify: false })
                                     .then(result2 => console.log(result2))
                                     .catch(err2 => console.log(err2));
                             }

                             Students.insertMany([{ firstName: "Tiger", lastName: "Foster", username: "tf2312201" }, { firstName: "Ward", lastName: "Royle", username: "wr2837312" }, { firstName: "Arthur", lastName: "Finn", username: "af2323831" }, { firstName: "Silvester", lastName: "Kodey", username: "sk2872871" }, { firstName: "Godfrey", lastName: "Lamar", username: "gl28738273" }, { firstName: "Erick", lastName: "Kermit", username: "ek32738738" }, { firstName: "Foster", lastName: "Russell", username: "fr2982981" }, { firstName: "Tristan", lastName: "Deon", username: "td28739827" }, { firstName: "Jerrold", lastName: "Sage", username: "js2718728" }, { firstName: "Joe", lastName: "Ross", username: "jr28737821" }, { firstName: "Gus", lastName: "Cyan", username: "gc28738271" }, { firstName: "Tommy", lastName: "Sacheverell", username: "ts28738271" }, { firstName: "Ernie", lastName: "Reid", username: "er2872817387" }],
                                 function(studentErr, studentCollection) {
                                     if (studentErr) {
                                         console.log(studentErr);
                                     } else {
                                         for (counter in studentCollection) {
                                             Students.findByIdAndUpdate(studentCollection[counter]._id, { $set: { course: courseCollection[0]._id } }, { new: true, useFindAndModify: false })
                                                 .then(result2 => console.log(result2))
                                                 .catch(err2 => console.log(err2));
                                         }
                                         for (counter in studentCollection) {
                                             Courses.findByIdAndUpdate(courseCollection[0]._id, { $push: { students: studentCollection[counter]._id } }, { new: true, useFindAndModify: false })
                                                 .then(result2 => console.log(result2))
                                                 .catch(err2 => console.log(err2));
                                         }


                                         //Inserting lecturers
                                         Lecturers.insertMany([{ firstName: "Nathan", lastName: "Blakemore", username: "nb29498382", password: "test123" }, { firstName: "Chris", lastName: "Deam", username: "cd7484758", password: "test123" }, { firstName: "Lantana", lastName: "Hewitt", username: "lh383847372", password: "test123" }, { firstName: "Shaun", lastName: "Terrance", username: "st29498382", password: "test123" }, { firstName: "Tommy", lastName: "Kay", username: "tk37384738", password: "test123" }, { firstName: "Traci", lastName: "Elissa", username: "te323382", password: "test123" }, { firstName: "Connell", lastName: "Mabelle", username: "cm2098309", password: "test123" }, { firstName: "Madge", lastName: "Gerald", username: "mg29432323", password: "test123" }, { firstName: "Enid", lastName: "Reagan", username: "er398309283", password: "test123" }], function(lecturerErr, lecturerCollection) {
                                             if (lecturerErr) {
                                                 console.log(lecturerErr);
                                             } else {
                                                 //Setting course leader
                                                 Courses.findByIdAndUpdate(courseCollection[0]._id, { $set: { courseLeader: lecturerCollection[0]._id } }, { new: true, useFindAndModify: false })
                                                     .then(result2 => console.log(result2))
                                                     .catch(err2 => console.log(err2));
                                                 //Adding lecturers to the various modules and making one of them module leader
                                                 for (let i = 0; i < moduleCollection.length; i++) {
                                                     Modules.findByIdAndUpdate(moduleCollection[i]._id, { $set: { moduleLeader: lecturerCollection[i + 1]._id } }, { new: true, useFindAndModify: false })
                                                         .then(result2 => console.log(result2))
                                                         .catch(err2 => console.log(err2));
                                                     Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { teachingLecturers: lecturerCollection[i + 1]._id } }, { new: true, useFindAndModify: false })
                                                         .then(result2 => console.log(result2))
                                                         .catch(err2 => console.log(err2));
                                                     Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { teachingLecturers: lecturerCollection[i + 2]._id } }, { new: true, useFindAndModify: false })
                                                         .then(result2 => console.log(result2))
                                                         .catch(err2 => console.log(err2));
                                                     Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { teachingLecturers: lecturerCollection[i + 3]._id } }, { new: true, useFindAndModify: false })
                                                         .then(result2 => console.log(result2))
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
                                                                 Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { groups: groupCollection[j]._id } }, { new: true, useFindAndModify: false })
                                                                     .then(result2 => console.log(result2))
                                                                     .catch(err2 => console.log(err2));
                                                                 Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { groups: groupCollection[j + 1]._id } }, { new: true, useFindAndModify: false })
                                                                     .then(result2 => console.log(result2))
                                                                     .catch(err2 => console.log(err2));
                                                                 Modules.findByIdAndUpdate(moduleCollection[i]._id, { $push: { groups: groupCollection[j + 2]._id } }, { new: true, useFindAndModify: false })
                                                                     .then(result2 => console.log(result2))
                                                                     .catch(err2 => console.log(err2));
                                                                 Groups.findByIdAndUpdate(groupCollection[j]._id, { $set: { module: moduleCollection[i]._id } }, { new: true, useFindAndModify: false })
                                                                     .then(result2 => console.log(result2))
                                                                     .catch(err2 => console.log(err2));
                                                                 Groups.findByIdAndUpdate(groupCollection[j + 1]._id, { $set: { module: moduleCollection[i]._id } }, { new: true, useFindAndModify: false })
                                                                     .then(result2 => console.log(result2))
                                                                     .catch(err2 => console.log(err2));
                                                                 Groups.findByIdAndUpdate(groupCollection[j + 2]._id, { $set: { module: moduleCollection[i]._id } }, { new: true, useFindAndModify: false })
                                                                     .then(result2 => console.log(result2))
                                                                     .catch(err2 => console.log(err2));
                                                                 j += 3;
                                                             }
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
     Users.insertMany([{ username: "mo190201", password: "test123" }, { username: "tf2312201", password: "test123" }, { username: "wr2837312", password: "test123" }, { username: "af2323831", password: "test123" }, { username: "sk2872871", password: "test123" }, { username: "gl28738273", password: "test123" }, { username: "ek32738738", password: "test123" }, { username: "fr2982981", password: "test123" }, { username: "td28739827", password: "test123" }, { username: "js2718728", password: "test123" }, { username: "jr28737821", password: "test123" }, { username: "kc28378273", password: "test123" }, { username: "gc28738271", password: "test123" }, { username: "ts28738271", password: "test123" }, { username: "er2872817387", password: "test123" }, { username: "nb29498382", password: "test123", roleType: 1 }, { username: "cd7484758", password: "test123", roleType: 1 }, { username: "lh383847372", password: "test123", roleType: 1 }, { username: "st29498382", password: "test123", roleType: 1 }, { username: "tk37384738", password: "test123", roleType: 1 }, { username: "te323382", password: "test123", roleType: 1 }, { username: "cm2098309", password: "test123", roleType: 1 }, { username: "mg29432323", password: "test123", roleType: 1 }, { username: "er398309283", password: "test123", roleType: 1 }], function(err, userCollection) {
         if (err) {
             console.log(err);
             console.log("Users insertion failed");
         } else {
             console.log("Users correctly inserted");
         }
     });

     return 1;
 };