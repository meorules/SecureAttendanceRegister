//Mongoose ver.
//Date type also functions as a timestamp
module.exports = mongoose => {
    var Lesson = mongoose.model(
        "Lesson",
        mongoose.Schema({
            date: {
                type: Date,
                required: true
            },
            attendance: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Attendance"
            }]
        }));
    return Lesson;
};