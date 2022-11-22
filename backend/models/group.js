//Mongoose ver.
module.exports = mongoose => {
    var Group = mongoose.model(
        "Group",
        mongoose.Schema({
            groupName: {
                type: String,
                required: true
            },
            groupType: {
                type: Boolean,
                default: false, //False is Lecture, True is Tutorial
                required: true
            },
            module: {
                type: String,
                ref: "Module"
            },
            lessons: [{
                type: String,
                ref: "Lesson"
            }],
            students: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }]
        })
    );
    return Group;
};