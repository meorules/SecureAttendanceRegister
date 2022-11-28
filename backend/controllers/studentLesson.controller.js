const config = require("../config/auth.config.js");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Group = db.groups;
const Lesson = db.lessons;
const User = db.users;


exports.findAll = async (req, res) => {
    let token = req.header('x-access-token')

    const userid = jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorised!" });
        }
        return req.userId = decoded.id;
        
      });
    
    const user = await User.findById(userid);
    

    if (user.roleType == 0){
        res.status(401).send({ message: "Unauthorised!" });
    }
    else if (user.roleType == 1){
        let id = req.params.groupid;
        const group = await Group.findById( id);

        console.log("lesson")

    const lessons = await Lesson.find({_id: {$in: group.lessons} })
    
    res.send(lessons)
    }
}