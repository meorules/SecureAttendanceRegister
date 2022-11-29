const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Student = db.students;
const Lecturer = db.lecturers;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    roleType: req.body.roleType
  });

console.log(req.body)
  user
    .save()
    .then(data => {
      if(req.body.roleType==0){
        console.log("eyo")
        Student.create({username:req.body.username,firstName:req.body.firstName,lastName:req.body.lastName}).then(result=>{
        }).catch(err=>res.status(500).send({ 
          message: err || "Some error during signup"})
          )
      }
      else if(req.body.roleType==1){
        Lecturer.create({username:req.body.username,firstName:req.body.firstName,lastName:req.body.lastName}).then(result=>{
        }).catch(err=>res.status(500).send({ 
          message: err || "Some error during signup"})
          )
      }
        console.log("Signup User saved in the database");
        res.status(200).send({ message: "User was registered successfully!" });
    })
    .catch(err => {
        res.status(500).send({ 
            message: err || "Some error during signup"});
    });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username, 
        roleType: user.roleType,      
        accessToken: token
      });
    });
};