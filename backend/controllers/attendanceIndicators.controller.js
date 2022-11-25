const db = require("../models");
const Group = db.groups;

// Find all Attendance Indicators.
exports.findAll = (req, res) => {
    const groupName = req.query.name;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = groupName ? { name: { $regex: new RegExp(groupName), $options: "i" } } : {};
     Group
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
            err.message || "Some error occurred while retrieving Attendance."
        });
      });
}

// Find a single Module with a Module Code.
exports.findOne = (req, res) => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Attendance."
  });

};