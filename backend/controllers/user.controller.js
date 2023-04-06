const db = require("../models");
const User = db.users;

// Create and Save a new User
// exports.create = async (req, res) => {
//     const userid = req.userId;

//     const userCheck = await User.findById(userid).catch(err => {
//         res.status(500).send({
//             message: err.message || "There was an error trying to find a user."
//         });
//     });

//     const user = new User({
//         username: req.body.username,
//         password: bcrypt.hashSync(req.body.password, 8),
//         firstName: req.body.firstName,
//         roleType: req.body.roleType
//       });
    
//       user
//         .save()
//         .then(data => {
//             console.log("Signup User saved in the database");
//             res.send({ message: "User was registered successfully!" });
//         })
//         .catch(err => {
//             res.status(500).send({ 
//                 message: err || "Some error during signup"});
//         });
// };


// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    const userid = req.userId;

    const user = await User.findById(userid).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error trying to find a user."
        });
    });

    if (user.roleType == 4) {
        const username = req.query.username;
        //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
        const condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
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
    }
    else{
        res.status(401).send({ message: "Unauthorised to view User List!" });
    }
};

// // Find a single User with an id
// exports.findOne = (req, res) => {

// };

// // Update a User by the id in the request
// exports.update = (req, res) => {

// };

// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {

// };

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {

// };