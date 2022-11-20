//Mongoose ver.
module.exports = mongoose => {
    //    console.log(mongoose.model("Kachow", mongoose.Schema({ first: { type: String, required: true } })));
    var User = mongoose.model(
        "User",
        mongoose.Schema({
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
                default: 0 //0 for students, 1 for lecturers
            }
        })
    );
    return User;
};