var db = require("../models");

module.exports = function(app) {

  // POST route to create new doses when user clicks submit
  app.post("/api/doses/:id", function(req, res) {
    db.Dose.create({
      value: req.body.value,
      unit: req.body.unit
    }).then(function(dbDose) {
      // HOW TO target user ID
      res.json(dbDose);
    });
  });
  // PUT route for updating doses
  app.put("/api/doses", function(req, res) {
    db.Dose.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbDose) {
        res.json(dbDose);
      });
  });  
}	
