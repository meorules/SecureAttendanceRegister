var express = require('express');
var router = express.Router();

var moduleController = require('../controllers/module.controller');

router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the Attendance api."});
   });


router.get('/modules', moduleController.findall)