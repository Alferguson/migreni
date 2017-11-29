var db = require("../models");

module.exports = function(app) {

  // GET route to display all migraine data when user clicks "Display previous migraines"
  app.get("/migraines/:uuid", function(req, res) {
    db.Migraine.findAll({
      // display all data where user uuid = database uuid
      where: {
        uuid: req.params.uuid
      },
      // display by when they were created via descend
      order: [
        ["createdAt", "DESC"]
      ]
    }).then(function(dbMigraine) {
      // display on handlebars, may not work
      res.json(dbMigraine).render("index", { migraine: dbMigraine });
    });
  });

  // POST route to create new migraines when user clicks submit
  app.post("/migraines", function(req, res) {
    // grab data from 4 questions, WHAT DO ABOUT MEDS AND WEATHER???
    db.Migraine.create({
      intensity: req.body.intensity,
      chronic_meds: req.body.chronic_meds,
      acute_meds: req.body.acute_meds,
      triggers: req.body.triggers
    }).then(function(dbMigraine) {
      // HOW TO target user ID
      res.json(dbMigraine);
    });
  });

  // PUT route to update previous migraines
  app.put("/migraines/:uuid", function(req, res) {
    db.Migraine.update ({
      intensity: req.body.intensity,
      chronic_meds: req.body.chronic_meds,
      acute_meds: req.body.acute_meds,
      triggers: req.body.triggers
      }, {    
      where: {
        uuid: req.params.uuid
      }
    }).then(function(results) {
      res.json(results);

    }).catch(function(err) {
      res.json(err);
    });
  });  

  // to delete previous migraines
  app.delete("/migraines/:uuid", function(req, res) {
    db.Migraine.destroy({
      where: {
        uuid: req.params.uuid
      }
    }).then(function(dbMigraine) {
      res.json(dbMigraine);
    });
  });
};