let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();

let mongoose = require('mongoose');
const db = require("../models");
const { lessons } = require('../models');
Groups = db.groups;
Modules = db.modules;
Lessons = db.lessons;


chai.use(chaiHttp);

describe('Testing editAttendance Routes', () => {
    //Testing GET /Attendance/modules/:moduleid/:groupid/editAttendance/:lessonid/:attendanceid/attendanceValue
    //Positive Test
    describe('Succesfully change an attendance value', () => {
        it('it should return the changed attendance object ( with value of 0) ', (done) => {
            Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
                if (moduleErr) {
                    console.log(moduleErr);
                } else {
                    let groupID = moduleReturned[0].groups[0]._id;
                    Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
                        if (groupErr) {
                            console.log(groupErr);
                        } else {
                            let lessons = groupReturned.lessons;
                            Lessons.findOne({ _id: lessons[0]._id }, function(lessonErr, lessonReturned) {
                                if (lessonErr) {
                                    console.log(lessonErr);
                                } else {
                                    chai.request(server)
                                        .post('/Attendance/auth/signin')
                                        .send({ username: "cd7484758", password: "test123" })
                                        .end((loginErr, loginDetails) => {
                                            loginDetails.should.have.status(200);
                                            loginDetails.body.should.have.property('id');
                                            loginDetails.body.should.have.property('roleType');
                                            loginDetails.body.should.have.property('accessToken');
                                            loginDetails.body.roleType.should.be.eql(1);

                                            chai.request(server)
                                                .put('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/editAttendance/' + lessonReturned._id + '/' + lessonReturned.attendance[0] + '/' + 'Not-Attended')
                                                .set('x-access-token', loginDetails.body.accessToken)
                                                .end((err, res) => {
                                                    res.should.have.status(200);
                                                    res.body.should.have.property('result')
                                                    res.body.result.attendanceValue.should.be.eql(0);
                                                    done();
                                                });

                                        })
                                }
                            })





                        }
                    })
                }
            })
        })
    })


    //Testing GET /Attendance/modules/:moduleid/:groupid/editAttendance/:lessonid/:attendanceid/attendanceValue
    //Negative Test
    describe('Fail to change an attendance by putting an incorrect value', () => {
        it('it should return a 400 status with invalid attendance value ', (done) => {
            Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
                if (moduleErr) {
                    console.log(moduleErr);
                } else {
                    let groupID = moduleReturned[0].groups[0]._id;
                    Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
                        if (groupErr) {
                            console.log(groupErr);
                        } else {
                            let lessons = groupReturned.lessons;
                            Lessons.findOne({ _id: lessons[0]._id }, function(lessonErr, lessonReturned) {
                                if (lessonErr) {
                                    console.log(lessonErr);
                                } else {
                                    chai.request(server)
                                        .post('/Attendance/auth/signin')
                                        .send({ username: "cd7484758", password: "test123" })
                                        .end((loginErr, loginDetails) => {
                                            loginDetails.should.have.status(200);
                                            loginDetails.body.should.have.property('id');
                                            loginDetails.body.should.have.property('roleType');
                                            loginDetails.body.should.have.property('accessToken');
                                            loginDetails.body.roleType.should.be.eql(1);

                                            chai.request(server)
                                                .put('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/editAttendance/' + lessonReturned._id + '/' + lessonReturned.attendance[0] + '/' + 'foiuh')
                                                .set('x-access-token', loginDetails.body.accessToken)
                                                .end((err, res) => {
                                                    res.should.have.status(400);
                                                    res.body.should.have.property('message')
                                                    res.body.message.should.be.eql('Invalid Attendance Value');
                                                    done();
                                                });

                                        })
                                }
                            })





                        }
                    })
                }
            })
        })
    })

})