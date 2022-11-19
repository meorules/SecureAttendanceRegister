const user = require('../user');
//Mongoose ver.
module.exports = mongoose => {
    var Student = user
        .discriminator('Student',
            new mongoose.Schema({
                //Unique attributes that Students have
                roleType: {
                    type: Number,
                    required: true,
                    default: 0 //0 for students, 1 for lecturers
                }
            })
        )

    return Student;
};