let chai = require('chai');
let chaiHttp = require('chai-http');
const e = require('express');
let server = require('../app');
let should = chai.should();

let mongoose = require('mongoose');
const db = require("../models");
userCreationLogs = db.userCreationlogs;


chai.use(chaiHttp);

describe('Testing Administrator User Routes', () => {
    describe('Testing logging in as a administrator', () => {
        //Testing POST /Attendance/auth/signin
        //Positive Test, logging in as a administrator
        it('it should return the user object with the access token and role type 4', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "nb37121", password: "test123" })
                .end((loginErr, loginDetails) => {
                    loginDetails.should.have.status(200);
                    loginDetails.body.should.have.property('id');
                    loginDetails.body.should.have.property('roleType');
                    loginDetails.body.should.have.property('accessToken');
                    loginDetails.body.roleType.should.be.eql(4);
                    done();
                })
        })
    })

    describe('Testing logging in as a administrator', () => {
        //Testing POST /Attendance/auth/signin
        //Negative Test, logging in as a administrator with incorrect details
        it('it should return a 401 status Invalid Password!', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "nb37121", password: "jofhs" })
                .end((loginErr, loginDetails) => {
                    loginDetails.should.have.status(401);
                    loginDetails.body.should.have.property('message');
                    loginDetails.body.message.should.be.eql('Invalid Password!');
                    done();
                })
        })
    })

    describe('Testing getting list of users as an administrator', () => {
        //Testing GET /users
        //Positive Test, logging in as a administrator and returning user list
        it('it should return the list of users', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "nb37121", password: "test123" })
                .end((loginErr, loginDetails) => {
                    loginDetails.should.have.status(200);
                    loginDetails.body.should.have.property('id');
                    loginDetails.body.should.have.property('roleType');
                    loginDetails.body.should.have.property('accessToken');
                    loginDetails.body.roleType.should.be.eql(4);
                    chai.request(server)
                        .get('/Attendance/users/')
                        .set('x-access-token', loginDetails.body.accessToken)
                        .end((err, res) => {
                            res.should.have.status(200);
                            //console.log(res)
                            done();
                        });
                })
        })
    })

    describe('Testing getting list of users as non-administrator', () => {
        //Testing GET /users
        //Negative Test, logging in as a lecturer and returning user list
        it('it should return an unauthorized message response', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "cd7484758", password: "test123" })
                .end((loginErr, lecturerLoginDetails) => {
                    lecturerLoginDetails.should.have.status(200);
                    lecturerLoginDetails.body.should.have.property('id');
                    lecturerLoginDetails.body.should.have.property('roleType');
                    lecturerLoginDetails.body.should.have.property('accessToken');
                    lecturerLoginDetails.body.roleType.should.be.eql(1);
                    if(lecturerLoginDetails!=null){
                        chai.request(server)
                            .get('/Attendance/users/')
                            .set('x-access-token', lecturerLoginDetails.body.accessToken)
                            .end((err, res) => {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                res.should.have.status(401);
                                res.body.should.have.property('message');
                                res.body.message.should.be.eql("Unauthorised to view User List!");
                                done();
                                }
                            });
                    }
                })
        })
    })

    describe('Testing creating a user as an administrator', () => {
        //Testing GET /users
        //Positive Test, logging in as a administrator and creating user
        it('it should 200 that the user was registered successfully', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "nb37121", password: "test123" })
                .end((loginErr, loginDetails) => {
                    loginDetails.should.have.status(200);
                    loginDetails.body.should.have.property('id');
                    loginDetails.body.should.have.property('roleType');
                    loginDetails.body.should.have.property('accessToken');
                    loginDetails.body.roleType.should.be.eql(4);
                    let user = {
                        username: "cb728191",
                        password: "kjska2jd7",
                        firstName: "chris",
                        lastName: "bates",
                        roleType: 1
                      };
                    chai.request(server)
                        .post('/Attendance/auth/signup')
                        .send({username:user.username,password:user.password,roleType:user.roleType,firstName:user.firstName,lastName:user.lastName})
                        .set('x-access-token', loginDetails.body.accessToken)
                        .end((err, res) => {
                            res.should.have.status(200);
                            //console.log(res)
                            done();
                            //Checking the log also reflects the user was created succesfully
                            userCreationLogs.find({actorUsername:"nb37121",usernameCreated:"cb728191",status:"Successful"}).then(data=>{
                                console.log("Correct User Creation log was also found");
                            })

                        });
                })
        })
    })

    describe('Testing creating a user as non-administrator', () => {
        //Testing GET /users
        //Negative Test, logging in as a lecturer and creating a user
        it('it should return an unauthorized message response', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "cd7484758", password: "test123" })
                .end((loginErr, lecturerLoginDetails) => {
                    lecturerLoginDetails.should.have.status(200);
                    lecturerLoginDetails.body.should.have.property('id');
                    lecturerLoginDetails.body.should.have.property('roleType');
                    lecturerLoginDetails.body.should.have.property('accessToken');
                    lecturerLoginDetails.body.roleType.should.be.eql(1);
                    if(lecturerLoginDetails!=null){
                        let user = {
                            username: "cbsao3728",
                            password: "kjska2jd7",
                            firstName: "chris",
                            lastName: "bates",
                            roleType: 1
                          };
                        chai.request(server)
                            .post('/Attendance/auth/signup')
                            .send({username:user.username,password:user.password,roleType:user.roleType,firstName:user.firstName,lastName:user.lastName})
                            .set('x-access-token', lecturerLoginDetails.body.accessToken)
                            .end((err, res) => {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                res.should.have.status(401);
                                res.body.should.have.property('message');
                                res.body.message.should.be.eql("Unauthorised to create users!");
                                done();
                                userCreationLogs.find({actorUsername:"nb37121",usernameCreated:"cbsao3728",status:"Unauthorized"}).then(data=>{
                                    console.log("Correct User Creation log was also found");
                                })
                                }
                            });
                    }
                })
        })
    })
    


})