const db = require("../models");
const Group = db.groups;

// Find a Group by module id.
exports.findOne = (req, res) => {
    let id = req.params.id;

    Group
        .find({ module: id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                message: err.message || "Some error occurred while retrieving Modules."
            });
        });
};

exports.findGroup = (req, res) => {
  let id = req.params.groupid;

  Group
      .find({ _id: id })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.send({
              message: err.message || "Some error occurred while retrieving Modules."
          });
      });
};