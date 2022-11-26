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

describe('Testing AttendanceIndicators Routes', () => {
    //Testing GET /Attendance/modules/:moduleid/:groupid/attendanceIndicators/ 
    //Positive Test
    describe('Return Students in Group', () => {
        it('it should return an array of students in the group', (done) => {
            Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
                if (moduleErr) {
                    console.log(moduleErr);
                } else {
                    let groupID = moduleReturned[0].groups[0]._id;
                    Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
                        if (groupErr) {
                            console.log(groupErr);
                        } else {
                            let students = groupReturned.students;
                            chai.request(server)
                                .get('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/attendanceIndicators')
                                .end((err, res) => {
                                    //console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    res.body.length.should.be.above(3);
                                    done();
                                });
                        }
                    })
                }
            })
        })
    })

    //Testing GET /Attendance/modules/:moduleid/:groupid/attendanceIndicators/ 
    //Negative Test, a non existant group id
    describe('Return Students in Group', () => {
        it('it should return a 500 status with an error message', (done) => {
            Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
                if (moduleErr) {
                    console.log(moduleErr);
                } else {
                    chai.request(server)
                        .get('/Attendance/modules/' + moduleReturned[0]._id + '/' + "4rfh834rfg77711" + '/attendanceIndicators')
                        .end((err, res) => {
                            res.should.have.status(500);
                            res.body.should.have.property('message');
                            res.body.message.should.be.eql('Cast to ObjectId failed for value "4rfh834rfg77711" (type string) at path "_id" for model "Group"');
                            done();
                        });
                }
            })
        })
    })

    //Testing GET /Attendance/modules/:moduleid/:groupid/attendanceIndicators/:studentid 
    //Positive Test
    describe('Return an array of attendances for a student', () => {
        it('it should return an array of students in the group', (done) => {
            Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
                if (moduleErr) {
                    console.log(moduleErr);
                } else {
                    let groupID = moduleReturned[0].groups[0]._id;
                    Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
                        if (groupErr) {
                            console.log(groupErr);
                        } else {
                            let students = groupReturned.students;

                            chai.request(server)
                                .get('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/attendanceIndicators/' + students[0]._id)
                                .end((err, res) => {
                                    //console.log(res);
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    res.body.length.should.be.equal(4);
                                    done();
                                });
                        }
                    })
                }
            })
        })
    })

    //Testing GET /Attendance/modules/:moduleid/:groupid/attendanceIndicators/:studentid 
    //Negative Test, passing an incorrect student. Currently not working as the routing does not return the response
    // describe('Return an array of attendances for a student', () => {
    //     it('it should return a 500 status with an error message', (done) => {
    //         Modules.find({ moduleName: "CAPS" }, function(moduleErr, moduleReturned) {
    //             if (moduleErr) {
    //                 console.log(moduleErr);
    //             } else {
    //                 let groupID = moduleReturned[0].groups[0]._id;
    //                 Groups.findOne({ _id: groupID }, function(groupErr, groupReturned) {
    //                     if (groupErr) {
    //                         console.log(groupErr);
    //                     } else {
    //                         let students = groupReturned.students;

    //                         chai.request(server)
    //                             .get('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/attendanceIndicators/' + "4rf1")
    //                             .end((err, res) => {
    //                                 //console.log(res);
    //                                 res.should.have.status(500);
    //                                 res.body.should.have.property('message');
    //                                 res.body.message.should.be.eql('Cast to ObjectId failed for value "4rf1" (type string) at path "_id" for model "Student"');
    //                                 done();
    //                             });
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // })





});