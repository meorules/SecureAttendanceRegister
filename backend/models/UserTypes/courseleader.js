// const lecturer = require('./lecturer');
// //Mongoose ver.
// module.exports = mongoose => {
//     var CourseLeader = lecturer()
//         .discriminator('CourseLeader',
//             new mongoose.Schema({
//                 //Unique attributes that CLeaders have, eg. their lead course(s)
//                 course: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "Course"
//                 }
//             })
//         )

//     return CourseLeader;
// };