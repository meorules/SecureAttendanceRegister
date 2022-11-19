//Mongoose ver.
module.exports = mongoose => {
    var Group = mongoose.model(
        "Group",
        mongoose.Schema({
            groupType: {
                type: Boolean,
                default: false, //False is Lecture, True is Tutorial
                required: true
            },
            module: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            },
            lessons: [{
                type: mongoose.Schema.Types.ObjectId,
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