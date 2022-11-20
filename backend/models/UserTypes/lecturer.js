//Mongoose ver.
module.exports = mongoose => {
    var Lecturer = mongoose.model(
        "Lecturer",
        mongoose.Schema({
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String
            },
            modules: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            }],
            advisees: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }]
        })
    );
    return Lecturer;
};