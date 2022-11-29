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

describe('Testing User Routes', () => {
    describe('Testing logging in as a lecturer', () => {
        //Testing POST /Attendance/auth/signin
        //Positive Test, logging in as a lecturer
        it('it should return the user object with the access token and role type 1', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "cd7484758", password: "test123" })
                .end((loginErr, loginDetails) => {
                    loginDetails.should.have.status(200);
                    loginDetails.body.should.have.property('id');
                    loginDetails.body.should.have.property('roleType');
                    loginDetails.body.should.have.property('accessToken');
                    loginDetails.body.roleType.should.be.eql(1);
                    done();
                })
        })
    })

    describe('Testing logging in as a lecturer', () => {
        //Testing POST /Attendance/auth/signin
        //Negative Test, logging in as a lecturer with incorrect details
        it('it should return a 401 status Invalid Password!', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "cd7484758", password: "jofhs" })
                .end((loginErr, loginDetails) => {
                    loginDetails.should.have.status(401);
                    loginDetails.body.should.have.property('message');
                    loginDetails.body.message.should.be.eql('Invalid Password!');
                    done();
                })
        })
    })

    describe('Testing logging in as a student', () => {
        //Testing POST /Attendance/auth/signin
        //Positive Test, logging in as a student
        it('it should return the user object with the access token', (done) => {
            chai.request(server)
                .post('/Attendance/auth/signin')
                .send({ username: "mo190201", password: "test123" })
                .end((loginErr, loginDetails) => {
                    loginDetails.should.have.status(200);
                    loginDetails.body.should.have.property('id');
                    loginDetails.body.should.have.property('roleType');
                    loginDetails.body.should.have.property('accessToken');
                    loginDetails.body.roleType.should.be.eql(0);
                    done();
                })
        })
    })

})