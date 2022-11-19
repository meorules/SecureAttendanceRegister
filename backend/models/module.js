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
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecturer"
            },
            groups: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Group"
            }]
        })
    );
    return Module;
};