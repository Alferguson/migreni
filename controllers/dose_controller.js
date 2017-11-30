var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");

// POST route to create new doses when user clicks submit
router.post("/api/doses/:id", function(req, res) {
  db.Dose.create({
    value: req.body.value,
    unit: req.body.unit
  }).then(function(dbDose) {
    // HOW TO target user ID
    res.json(dbDose);
  });
});
// PUT route for updating doses
router.put("/api/doses", function(req, res) {
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

module.exports = router;