//Mongoose ver.
module.exports = mongoose => {
    var Attendance = mongoose.model(
        "attendance",
        mongoose.Schema({
            attendanceValue: {
                type: Number,
                required: true,
                defaultValue: 0 //0 for not attended, 1 for attended, 2 for excused absence, 3 for late
            }
        })
    );
    return Attendance;
};