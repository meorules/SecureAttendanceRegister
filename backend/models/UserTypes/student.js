//Mongoose ver.
module.exports = mongoose => {
    var Student = mongoose.model(
        "Student",
        mongoose.Schema({
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String
            },
            modules: [{
                type: String,
                ref: "Module"
            }],
            academicAdvisor: {
                type: String,
                ref: "Lecturer"
            },
            course: {
                type: String,
                ref: "Course"
            }
        })
    );
    return Student;
};