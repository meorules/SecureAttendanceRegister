//Mongoose ver.
module.exports = mongoose => {
    var attendanceChangeLog = mongoose.model(
        "attendanceChangeLog",
        mongoose.Schema({
            actorUsername: {
                type: String,
                required: true,
                lowercase: true,
            },
            student: {
                type: String,
                required: true,
                lowercase: true
            },
            attendanceValueBefore: {
                type: Number,
                required: true,
                default: 0 //0 for not attended, 1 for attended, 2 for excused absence, 3 for late
            },
            attendanceValueAfter: {
                type: Number,
                required: true,
                default: 0 //0 for not attended, 1 for attended, 2 for excused absence, 3 for late
            },
            attendance: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Attendance"
            },
            date: {
                type: Date,
                required: true
            },
        })
    );
    return attendanceChangeLog;
};