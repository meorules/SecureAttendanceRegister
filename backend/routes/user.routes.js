var express = require('express');
var router = express.Router();
 
//Require controller
var userController = require('../controllers/user.controller');
 
router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the user management subsystem api."});
});

// Retrieve all users
router.get("/users/", userController.findAll);


module.exports = router;