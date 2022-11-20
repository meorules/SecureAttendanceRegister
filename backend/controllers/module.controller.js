const db = require("../models");
const Module = db.modules;

// Find all Modules.
exports.findAll = (req, res) => {
    const name = req.query.name;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = moduleName ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
     Module
      .find(condition)
      .then(data => {
        //res.render('animals',
        //  {title: 'Pet Store',
        //   animals: data});
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Modules."
        });
      });
}

// Find a single Module with a Module Code.
exports.findOne = (req, res) => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving one Module."
  });

};

