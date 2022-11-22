const db = require("../models");
const Group = db.groups;

// Find all Modules.
exports.findOne = (req, res) => {
  let id = req.params.id;
 
   Group
     .find({module: id })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.send({
         message:
           err.message || "Some error occurred while retrieving Modules."
       });
     });
 };