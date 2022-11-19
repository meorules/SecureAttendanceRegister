//Mongoose ver.
module.exports = mongoose => {
    var Group = mongoose.model(
        "group",
        mongoose.Schema({
            groupType: {
                type: Boolean,
                default: false,     //False is Lecture, True is Tutorial
                required: true
            }
        })
    );
    return Group;
};