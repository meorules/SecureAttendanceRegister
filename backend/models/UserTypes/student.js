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
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            }],
            academicAdvisor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecturer"
            },
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        })
    );
    return Student;
};