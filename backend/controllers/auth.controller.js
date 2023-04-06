const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Student = db.students;
const Lecturer = db.lecturers;
const UserCreationLogs = db.userCreationlogs;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const userid = req.userId;

  const userCheck = await User.findById(userid).catch(err => {
    res.status(500).send({
          message: err.message || "There was an error trying to find a user."
    });
  });
  
  if (userCheck.roleType == 4) {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      roleType: req.body.roleType
    });

    user
      .save()
      .then(data => {
        if(req.body.roleType==0){
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
          UserCreationLogs.create({actorUsername:userCheck.username,usernameCreated:req.body.username,status:"Successful",date:Date.now()})
          .catch(err=>res.status(500).send({ 
            message: err || "Some error during logging of signup"})
          )
          res.status(200).send({ message: "User was registered successfully!" });
      })
      .catch(err => {
          res.status(500).send({ 
              message: err || "Some error during signup"});
      });
    }
    else {
      UserCreationLogs.create({actorUsername:userCheck.username,usernameCreated:req.body.username,status:"Unauthorized",date:Date.now()})
      res.status(401).send({ message: "Unauthorised to create users!" });
    }
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