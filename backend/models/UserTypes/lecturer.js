const user = require('../user');
//Mongoose ver.
module.exports = mongoose => {
    var Lecturer = user
        .discriminator('Lecturer',
            new mongoose.Schema({
                //Unique attributes that Lecturers have
                roleType: {
                    type: Number,
                    required: true,
                    default: 1 //0 for students, 1 for lecturers
                }
            })
        )

    return Lecturer;
};