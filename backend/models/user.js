//Mongoose ver.
module.exports = mongoose => {
    var User = mongoose.model(
        "user",
        mongoose.Schema({
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String
            },
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            roleType: {
                type: Number,
                required: true,
                default: 0
            }
        })
    );
    return User;
};