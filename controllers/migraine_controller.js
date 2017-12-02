var express = require("express");
var db = require("../models");
var router = express.Router();

// GET route to display all migraine data when user clicks "Display previous migraines"
router.get("/api/migraines/:id", function(req, res) {
  db.MigraineTreatment.findAll({
    // display all migraines for id
    where: {
      MigraineId: req.params.id
    },
    include: [
      {
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
router.post("/api/migraines/:id", function(req, res) {
  // grab data from 4 questions, WHAT DO ABOUT MEDS AND WEATHER???
  db.Migraine.create({
    UserId: req.params.id,
    intensity: req.body.intensity,
    location: req.body.location,
    date: req.body.date,
    trigger: req.body.trigger
  }).then(function(dbMigraine) {
    db.Weather.create({
      MigraineId: dbMigraine.id,
      temp: req.body.currentWeather.temp,
      humidity: req.body.currentWeather.humidity,
      precip: req.body.currentWeather.precip
    }).then(function(dbWeather) {
      // res.json(dbWeather);
    });  
    // if function to not POST chronic treatment data if chronic treatment is not entered
    if (req.body.chronicTreatment.treatment_name === "" && req.body.acuteTreatment.treatment_name === "") {
      return;
    } else {
      // to ADD chronic treatment
      db.Treatment.create({
        treatment_name: req.body.chronicTreatment.treatment_name,
        acute: false,
        dose: req.body.chronicTreatment.dose,
        dose_unit: req.body.chronicTreatment.dose_unit   
      }).then(function(dbChronicTreatment) {
        // to ADD keys to MigraineTreatment for chronic
        db.MigraineTreatment.create({
          TreatmentId: dbChronicTreatment.id,
          MigraineId: dbMigraine.id
        })
      });
      // to ADD acute treatment
      db.Treatment.create({
        treatment_name: req.body.acuteTreatment.treatment_name,
        acute: true,
        dose: req.body.acuteTreatment.dose,
        dose_unit: req.body.acuteTreatment.dose_unit  
      }).then(function(dbAcuteTreatment) {
        // to ADD keys to MigraineTreatment for acute
        db.MigraineTreatment.create({
          TreatmentId: dbAcuteTreatment.id,
          MigraineId: dbMigraine.id
        })
      });
    }
    res.end();   
  })
});   

// // PUT route to update previous migraines
// router.put("/api/migraines/:id", function(req, res) {
//   db.Migraine.update (
//     req.body, 
//     {    
//       where: {
//         id: req.params.id
//       },
//       include: [
//         {
//           model: db.Treatment,
//           include: [db.Dose]
//         }
//       ],
//       include:   
//   }).then(function(dbMigraine) {
//     res.json(dbMigraine);

//   }).catch(function(err) {
// // do error catching
//     res.statusMessage = error.errors[0].message;
//     res.sendStatus(404).end();
//   });
// });  

// // to delete previous migraines
// router.delete("/api/migraines/:id", function(req, res) {
//   db.Migraine.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(dbMigraine) {
//     res.json(dbMigraine);
//   })
// });

module.exports = router;