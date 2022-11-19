const user = require('../user');
//Mongoose ver.
module.exports = mongoose => {
    var Lecturer = user
    .discriminator('lecturer',
    new mongoose.Schema({
        //Unique attributes that Lecturers have, eg. their taught groups(?)
    })
    )
    
    return Lecturer;
};