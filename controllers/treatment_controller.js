var express = require("express");
var db = require("../models");
var router = express.Router();

// TODO
// GET route to find the last treatment for user if user stayed on current drug therapy
router.get("/api/treatments/:id", function(req, res) {
  db.Treatment.findOne({
    name: name,
    // display all migraines for id
    where: {
      MigraineId: req.params.id
    }
  }).then(function(dbTreatments) {
    // display on handlebars, may not work
    res.render("index", { name: dbTreatments.name });
  });
});


// POST route to create new treatments when user clicks submit
router.post("/api/treatments/:id", function(req, res) {
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
router.put("/api/treatments", function(req, res) {
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

module.exports = router;