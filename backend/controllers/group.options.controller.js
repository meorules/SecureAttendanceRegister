const db = require("../models");
const Group = db.groups;

// Find a group by group id.
exports.findOne = (req, res) => {
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