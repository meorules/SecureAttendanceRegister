const lecturer = require('../lecturer');
//Mongoose ver.
module.exports = mongoose => {
    var CourseLeader = lecturer
    .discriminator('courseLeader',
    new mongoose.Schema({
        //Unique attributes that CLeaders have, eg. their lead course(s)
    })
    )
    
    return CourseLeader;
};