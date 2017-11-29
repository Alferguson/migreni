var db = require("../models");

module.exports = function(app) {

  // GET route to display all migraine data when user clicks "Display previous migraines"
  app.get("/api/migraines/:id", function(req, res) {
    db.Migraine.findAll({
      // display all migraines for id
      where: {
        UserUuid: req.params.id
      },
      include: [ {
        model: db.Treatment,
        include: [db.Dose]
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
  app.post("/api/migraines", function(req, res) {
    // grab data from 4 questions, WHAT DO ABOUT MEDS AND WEATHER???
    db.Migraine.create({
      intensity: req.body.intensity,
      location: req.body.location,
      date: req.body.date,
      trigger: req.body.trigger
    }).then(function(dbMigraine) {
      // HOW TO target user ID
      res.json(dbMigraine);
    });
  });

  // PUT route to update previous migraines
  app.put("/api/migraines/:id", function(req, res) {
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
  app.delete("/api/migraines/:id", function(req, res) {
    db.Migraine.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMigraine) {
      res.json(dbMigraine);
    });
  });
};