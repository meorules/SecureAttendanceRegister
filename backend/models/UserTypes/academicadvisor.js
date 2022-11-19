const lecturer = require('lecturer');
//Mongoose ver.
module.exports = mongoose => {
    var AcademicAdvisor = lecturer
        .discriminator('AcademicAdvisor',
            new mongoose.Schema({
                //Unique attributes that AAdvisors have, eg. their advisees
                advisees: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student"
                }]
            })
        )

    return AcademicAdvisor;
};