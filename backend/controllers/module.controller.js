const db = require("../models");
const module= db.module;

exports.findAll = (req, res) => {

    const username = req.query.name;

    var condition = username? {name: {$regex: new RegExp(username), $options: "i"} } : {};
    Module 
        .find(condition)
        .then(data => {
            res.send(data);
        })
}


