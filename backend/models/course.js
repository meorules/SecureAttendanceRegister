//Mongoose ver.
module.exports = mongoose => {
    var Course = mongoose.model(
        "course",
        mongoose.Schema({
            courseName: {
                type: String,
                required: true
            },
            courseCode: {
                type: String,
                required: true
            }
        })
    );
    return Course;
};