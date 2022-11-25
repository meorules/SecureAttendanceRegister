//Mongoose ver.
module.exports = mongoose => {
    var Course = mongoose.model(
        "Course",
        mongoose.Schema({
            courseName: {
                type: String,
                required: true
            },
            courseCode: {
                type: String,
                required: true
            },
            modules: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            }],
            courseLeader: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecturer"
            },
            students: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }]
        })
    );
    return Course;
};