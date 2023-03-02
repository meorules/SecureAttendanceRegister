let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();

let mongoose = require('mongoose');
const db = require("../models");

Groups = db.groups;
Modules = db.modules;


chai.use(chaiHttp);

describe('Testing deleteLesson Routes', () => {
    //Testing DELETE /Attendance/modules/:moduleid/:groupid/deleteLesson/:lessonid
    //Positive Test, deleting a normal lesson
    describe('Succeed to delete a lesson', () => {
        it('it should return a 200 status', (done) => {
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
                            chai.request(server)
                                .post('/Attendance/auth/signin')
                                .send({ username: "cd7484758", password: "test123" })
                                .end((loginErr, loginDetails) => {
                                    loginDetails.should.have.status(200);
                                    loginDetails.body.should.have.property('id');
                                    loginDetails.body.should.have.property('roleType');
                                    loginDetails.body.should.have.property('accessToken');
                                    loginDetails.body.roleType.should.be.eql(1);

                                    if(loginErr){
                                        console.log(loginErr);
                                    }

                                    chai.request(server)
                                        .delete('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/deleteLesson/' + lessons[0]._id)
                                        .set('x-access-token', loginDetails.body.accessToken)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.should.have.property('message');
                                            res.body.message.should.be.eql('Lesson has been deleted');
                                            done();
                                        });
                                })
                        }
                    })
                }
            })
        })
    })

    //Testing DELETE /Attendance/modules/:moduleid/:groupid/deleteLesson/:lessonid
    //Negative Test, deleting a lesson without a real id
    describe('Fail to delete a lesson', () => {
        it('it should return a 500 status', (done) => {
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
                            chai.request(server)
                                .post('/Attendance/auth/signin')
                                .send({ username: "cd7484758", password: "test123" })
                                .end((loginErr, loginDetails) => {
                                    loginDetails.should.have.status(200);
                                    loginDetails.body.should.have.property('id');
                                    loginDetails.body.should.have.property('roleType');
                                    loginDetails.body.should.have.property('accessToken');
                                    loginDetails.body.roleType.should.be.eql(1);

                                    if(loginErr){
                                        console.log(loginErr);
                                    }

                                    chai.request(server)
                                        .delete('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/deleteLesson/' + 'efoiewrf')
                                        .set('x-access-token', loginDetails.body.accessToken)
                                        .end((err, res) => {
                                            res.should.have.status(500);
                                            res.body.should.have.property('message');
                                            done();
                                        });
                                })
                        }
                    })
                }
            })
        })
    })


    //Testing POST /Attendance/modules/:moduleid/:groupid/deleteLesson/
    //Positive Test
    describe('Get a list of all lessons', () => {
        it('it should return a 200 status with all the lessons in the provided group', (done) => {
            Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
                if (moduleErr) {
                    console.log(moduleErr);
                } else {
                    let groupID = moduleReturned[0].groups[0]._id;
                    Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
                        if (groupErr) {
                            console.log(groupErr);
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

                                    if(loginErr){
                                        console.log(loginErr);
                                    }


                                    chai.request(server)
                                        .get('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/deleteLesson')
                                        .set('x-access-token', loginDetails.body.accessToken)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.should.be.a('array');
                                            res.body.length.should.be.above(2);
                                            done();
                                        });
                                })
                        }
                    })
                }
            })
        })
    })


})