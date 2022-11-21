module.exports = db => {

    Users = db.users;
    Attendances = db.attendances;
    Courses = db.courses;
    Groups = db.groups;
    Lessons = db.lessons;
    Modules = db.modules;
    Lecturers = db.lecturers;
    Students = db.students;

    //Inserting the users for the students
    Users.insertMany([{ username: "mo190201", password: "test123" }, { username: "tf2312201", password: "test123" }, { username: "wr2837312", password: "test123" }, { username: "af2323831", password: "test123" }, { username: "sk2872871", password: "test123" }, { username: "gl28738273", password: "test123" }, { username: "ek32738738", password: "test123" }, { username: "fr2982981", password: "test123" }, { username: "td28739827", password: "test123" }, { username: "js2718728", password: "test123" }, { username: "jr28737821", password: "test123" }, { username: "kc28378273", password: "test123" }, { username: "gc28738271", password: "test123" }, { username: "ts28738271", password: "test123" }, { username: "er2872817387", password: "test123" }]);

    //Creating the students themselves
    Students.insertMany([{ firstName: "Tiger", lastName: "Foster", username: "tf2312201" }, { firstName: "Ward", lastName: "Royle", username: "wr2837312" }, { firstName: "Arthur", lastName: "Finn", username: "af2323831" }, { firstName: "Silvester", lastName: "Kodey", username: "sk2872871" }, { firstName: "Godfrey", lastName: "Lamar", username: "gl28738273" }, { firstName: "Erick", lastName: "Kermit", username: "ek32738738" }, { firstName: "Foster", lastName: "Russell", username: "fr2982981" }, { firstName: "Tristan", lastName: "Deon", username: "td28739827" }, { firstName: "Jerrold", lastName: "Sage", username: "js2718728" }, { firstName: "Joe", lastName: "Ross", username: "jr28737821" }, { firstName: "Gus", lastName: "Cyan", username: "gc28738271" }, { firstName: "Tommy", lastName: "Sacheverell", username: "ts28738271" }, { firstName: "Ernie", lastName: "Reid", username: "er2872817387" }]);

    //Creating the users for the lecturers
    Users.insertMany([{ username: "nb29498382", password: "test123", roleType: 1 }, { username: "cd7484758", password: "test123", roleType: 1 }, { username: "lh383847372", password: "test123", roleType: 1 }, { username: "st29498382", password: "test123", roleType: 1 }, { username: "tk37384738", password: "test123", roleType: 1 }, { username: "te323382", password: "test123", roleType: 1 }, { username: "cm2098309", password: "test123", roleType: 1 }, { username: "mg29432323", password: "test123", roleType: 1 }, { username: "er398309283", password: "test123", roleType: 1 }])

    //Creating the lecturers themselves
    Lecturers.insertMany([{ firstName: "Nathan", lastName: "Blakemore", username: "nb29498382", password: "test123" }, { firstName: "Chris", lastName: "Deam", username: "cd7484758", password: "test123" }, { firstName: "Lantana", lastName: "Hewitt", username: "lh383847372", password: "test123" }, { firstName: "Shaun", lastName: "Terrance", username: "st29498382", password: "test123" }, { firstName: "Tommy", lastName: "Kay", username: "tk37384738", password: "test123" }, { firstName: "Traci", lastName: "Elissa", username: "te323382", password: "test123" }, { firstName: "Connell", lastName: "Mabelle", username: "cm2098309", password: "test123" }, { firstName: "Madge", lastName: "Gerald", username: "mg29432323", password: "test123" }, { firstName: "Enid", lastName: "Reagan", username: "er398309283", password: "test123" }])

    //Modules
    Modules.insertMany([{ moduleName: "CAPS", moduleCode: "CHA-3382" }, { moduleName: "SAD", moduleCode: "CHA-3382" }, { moduleName: "AdvancedProgamming", moduleCode: "CHA-3382" }, { moduleName: "ADS", moduleCode: "CHA-3382" }, { moduleName: "AI&ML", moduleCode: "CHA-3382" }, { moduleName: "MATH", moduleCode: "CHA-3382" }])

    //Course Entry
    Courses.insertMany([{
        courseName: "BSc Computer Science",
        courseCode: "CS202348"
    }, {
        courseName: "Jewellery & Metallurgy",
        courseCode: "JM2830820"
    }]);

    studentCollection = Students.find()
        .then(result => {
            //console.log(result);
            for (returnedStudent in result) {
                console.log(returnedStudent);
                Courses.findByIdAndUpdate({ courseCode: "CS202348" }, { $push: { students: returnedStudent._id } }, { new: true, useFindAndModify: false })
                    .then(result2 => console.log(result2, returnedStudent))
                    .catch(err2 => console.log(err2));
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(info => {
            for (returnedStudent in info) {
                console.log(returnedStudent);
                Courses.findByIdAndUpdate({ courseCode: "CS202348" }, { $push: { students: returnedStudent._id } }, { new: true, useFindAndModify: false });
            }
        })


    infinity = true;
    while (!infinity) {
        return 1;
    }
};