//Mongoose ver.
//Date type also functions as a timestamp
module.exports = mongoose => {
    var Lesson = mongoose.model(
        "lesson",
        mongoose.Schema({
            date: {
                type: Date,
                required: true
            }
        })
    );
    return Lesson;
};