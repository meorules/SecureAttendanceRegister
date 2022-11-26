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

describe('Testing createLesson Routes', () => {
    //Testing POST /Attendance/modules/:moduleid/:groupid/createLesson/
    //Positive Test, 
    // describe('Create a lesson', () => {
    //     it('it should return a 200 request with the newly created lesson', (done) => {
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
    //                             //NEED TO ATTATCH THE TIME AND DATE, WILL LOOK AT HOW THAT IS DONE WHEN NATHAN CREATES ROUTES
    //                             .post('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/createLesson/')
    //                             .end((err, res) => {
    //                                 console.log(res);
    //                                 res.should.have.status(500);
    //                                 done();
    //                             });
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // })

    //Testing POST /Attendance/modules/:moduleid/:groupid/createLesson/
    //Negative Test, 
    describe('Fail to create a lesson', () => {
        it('it should return a 500 error request', (done) => {
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
                                .post('/Attendance/modules/' + moduleReturned[0]._id + '/' + groupReturned._id + '/createLesson/')
                                .end((err, res) => {
                                    console.log(res);
                                    res.should.have.status(500);
                                    done();
                                });
                        }
                    })
                }
            })
        })
    })
})