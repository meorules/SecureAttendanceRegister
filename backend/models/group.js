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
            lessons: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson"
            }]
        })
    );
    return Group;
};