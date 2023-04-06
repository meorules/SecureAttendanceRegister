//Mongoose ver.
module.exports = mongoose => {
    var UserCreationLog = mongoose.model(
        "UserCreationLog",
        mongoose.Schema({
            actorUsername: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            usernameCreated: {
                type: String,
                required: true,
                lowercase: true
            },
            status:{
                type:String
            },
            date: {
                type: Date,
                required: true
            },
        })
    );
    return UserCreationLog;
};