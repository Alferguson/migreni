var db = require("../models");

module.exports = function(app) {

  // POST route to create new treatments when user clicks submit
  app.post("/api/treatments/:id", function(req, res) {
    db.Treatment.create({
      name: req.body.name,
      // acute is a BOOLEAN so keep in mind
      acute: req.body.acute,
      category: req.body.category
    }).then(function(dbTreatments) {
      // HOW TO target user ID
      res.json(dbTreatments);
    });
  });
  // PUT route for updating treatments
  app.put("/api/treatments", function(req, res) {
    db.Treatment.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTreatments) {
        res.json(dbTreatments);
      });
  });  
}	
