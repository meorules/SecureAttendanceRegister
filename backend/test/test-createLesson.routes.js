// let chai = require('chai');
// let chaiHttp = require('chai-http');
// const e = require('express');
// let server = require('../app');
// let should = chai.should();

// let mongoose = require('mongoose');
// const db = require("../models");
// Groups = db.groups;
// Modules = db.modules;


// chai.use(chaiHttp);

// describe('Testing createLesson Routes', () => {
//     //Testing POST /Attendance/modules/:moduleid/:groupid/createLesson/
//     //Positive Test, creating a normal lesson
//     describe('Succeed to create a lesson', () => {
//         it('it should return a 200 status with the new lesson created', (done) => {
//             Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
//                 if (moduleErr) {
//                     console.log(moduleErr);
//                 } else {
//                     let groupID = moduleReturned[0].groups[0]._id;
//                     Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
//                         if (groupErr) {
//                             console.log(groupErr);
//                         } else {
//                             let students = groupReturned.students;
//                             chai.request(server)
//                                 .post('/Attendance/auth/signin')
//                                 .send({ username: "cd7484758", password: "test123" })
//                                 .end((loginErr, loginDetails) => {
//                                     loginDetails.should.have.status(200);
//                                     loginDetails.body.should.have.property('id');
//                                     loginDetails.body.should.have.property('roleType');
//                                     loginDetails.body.should.have.property('accessToken');
//                                     loginDetails.body.roleType.should.be.eql(1);

//                                     chai.request(server)
//                                         .post('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/createLesson/' + '2022-11-14' + '/' + '10:00:00')
//                                         .set('x-access-token', loginDetails.body.accessToken)
//                                         .end((err, res) => {
//                                             console.log(res);
//                                             res.should.have.status(200);
//                                             res.body.should.be.a('object');
//                                             done();
//                                         });


//                                 })
//                         }
//                     })
//                 }
//             })
//         })
//     })

//     //Testing POST /Attendance/modules/:moduleid/:groupid/createLesson/
//     //Negative Test, incorrect date
//     describe('Fail to create a lesson', () => {
//         it('it should return a 500 error request', (done) => {
//             Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
//                 if (moduleErr) {
//                     console.log(moduleErr);
//                 } else {
//                     let groupID = moduleReturned[0].groups[0]._id;
//                     Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
//                         if (groupErr) {
//                             console.log(groupErr);
//                         } else {
//                             let students = groupReturned.students;
//                             chai.request(server)
//                                 .post('/Attendance/auth/signin')
//                                 .send({ username: "cd7484758", password: "test123" })
//                                 .end((loginErr, loginDetails) => {
//                                     loginDetails.should.have.status(200);
//                                     loginDetails.body.should.have.property('id');
//                                     loginDetails.body.should.have.property('roleType');
//                                     loginDetails.body.should.have.property('accessToken');
//                                     loginDetails.body.roleType.should.be.eql(1);

//                                     chai.request(server)
//                                         .post('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/createLesson/' + '2022-13-10' + '/' + '22:00:00')
//                                         .set('x-access-token', loginDetails.body.accessToken)
//                                         .end((err, res) => {
//                                             //console.log(res);
//                                             res.should.have.status(500);
//                                             done();
//                                         });
//                                 })
//                         }
//                     })
//                 }
//             })
//         })
//     })


// })