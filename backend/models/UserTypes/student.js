const user = require('../user');
//Mongoose ver.
module.exports = mongoose => {
    var Student = user
    .discriminator('student',
    new mongoose.Schema({
        //Unique attributes that Students have, eg. their lessons(?)
    })
    )
    
    return Student;
};