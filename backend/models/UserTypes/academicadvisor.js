const lecturer = require('lecturer');
//Mongoose ver.
module.exports = mongoose => {
    var AcademicAdvisor = lecturer
    .discriminator('academicAdvisor',
    new mongoose.Schema({
        //Unique attributes that AAdvisors have, eg. their advisees
    })
    )
    
    return AcademicAdvisor;
};