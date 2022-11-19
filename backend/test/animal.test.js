let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

// let mongoose = require('mongoose');
// let Animal = require('../models/animal.model');
const db = require("../models");
const User = db.users;

chai.use(chaiHttp);
 
//the parent block
describe('Testing the /Attendance path', () => {
    //Testing GET /Attendance
    describe('GET /Attendance', () => {
        it('it should return a welcome message', (done) => {
            chai.request(server)
            .get('/Attendance')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Welcome to the Attendance api.');
                done();
            });
        });
    });
    // Finished GET /Attendance
    
    //Testing GET /Attendance/animals
    describe('GET /Attendance/animals', () => {
        it('it should GET all the animals', (done) => {
            chai.request(server)
            .get('/Attendance/animals')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
        });
    });
    //Finished GET /Attendance/animals

    //Testing POST /Attendance/animals - negative test
    describe('POST /Attendance/animals - negative', () => {
        it('it should not POST an animal without name field', (done) => {
            let animal = {
                species: "dog",
                breed: "caninus canine",
                age: 12,
                colour: "yellow"
            };
            chai.request(server)
                .post('/Attendance/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Content can not be empty!');
                    done();
                });
        });
    });
    //Finished POST /Attendance/pets - negative test

    //Testing POST /Attendance/animals - positive test
    describe('POST /Attendance/animals', () => {
        let animal;

        before(function(done) {
            User.find({})
            .then(data => {
                let userId = data[0]._id;
                animal = {
                    name: "fido",
                    species: "dog",
                    breed: "caninus canine",
                    age: 12,
                    colour: "yellow",
                    userid: userId
                }; 
                done();
            })
            .catch(err => {
                done(err);
            });
        });
        
        it('it should POST an animal ', (done) => {        
            chai.request(server)
                .post('/Attendance/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('species');
                    res.body.should.have.property('breed');
                    res.body.should.have.property('age');
                    res.body.should.have.property('colour');
                    done();
                });
        });
    });
    //Finished POST /Attendance/pets
});