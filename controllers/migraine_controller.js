var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");

// GET route to display all migraine data when user clicks "Display previous migraines"
router.get("/api/migraines/:id", function(req, res) {
  db.Migraine.findAll({
    // display all migraines for id
    where: {
      UserUuid: req.params.id
    },
    include: [
      {
        model: db.Treatment,
        include: [db.Dose]
        // maybe include: [
        //   {
        //     db.Dose,
        //     db.Category
        //   }
        // ]
      },
      db.Weather
    ],
    // display by when they were created via descend
    order: [
      ["date", "DESC"]
    ]
  }).then(function(dbMigraine) {
    // display on handlebars, may not work
    res.render("index", { migraine: dbMigraine });
  });
});

// POST route to create new migraines when user clicks submit
router.post("/api/migraines/:id", function(req, res) {
  // grab data from 4 questions, WHAT DO ABOUT MEDS AND WEATHER???
  db.Migraine.create({
    intensity: req.body.intensity,
    location: req.body.location,
    date: req.body.date,
    trigger: req.body.trigger,
    UserUuid: req.params.id
  }).then(function(dbMigraine) {
    // HOW TO target user ID
    res.json(dbMigraine);
  });
});

// PUT route to update previous migraines
router.put("/api/migraines/:id", function(req, res) {
  db.Migraine.update (
    req.body, 
    {    
      where: {
        id: req.params.id
    }
  }).then(function(dbMigraine) {
    res.json(dbMigraine);

  }).catch(function(err) {
// do error catching
    res.statusMessage = error.errors[0].message;
    res.sendStatus(404).end();
  });
});  

// to delete previous migraines
router.delete("/api/migraines/:id", function(req, res) {
  db.Migraine.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbMigraine) {
    res.json(dbMigraine);
  });
});

module.exports = router;