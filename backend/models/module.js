//Mongoose ver.
module.exports = mongoose => {
    var Module = mongoose.model(
        "Module",
        mongoose.Schema({
            moduleCode: {
                type: String,
                required: true
            },
            moduleName: {
                type: String,
                required: true
            },
            moduleLeader: {
                type: String,
                ref: "Lecturer"
            },
            teachingLecturers: [{
                type: String,
                ref: "Lecturer"
            }],
            groups: [{
                type: String,
                ref: "Group"
            }]
        })
    );
    return Module;
};