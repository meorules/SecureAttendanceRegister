const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        firstName: req.body.firstName,
        roleType: req.body.roleType
      });
    
      user
        .save()
        .then(data => {
            console.log("Signup User saved in the database");
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ 
                message: err || "Some error during signup"});
        });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    User
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {

};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};