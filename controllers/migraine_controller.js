var express = require("express");
var db = require("../models");
var router = express.Router();
var authCheck = require("../authCheck.js")

router.get("/api/migraine/:id", authCheck(), function(req, res) {
  db.Migraine.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Treatment, db.Weather]
  }).then(function(data) {
    res.json(data);
  })
})

// // GET route to get data on treatment name and dose for chronic if null
// router.get("/api/migraines/:id", authCheck(), function(req, res) {
//   db.Migraine.findOne({
//     // display all migraines for id
//     where: {
//       id: req.params.id
//     },
//     include: [
//       {
//         model: db.Treatment,
//         where: {
//           acute: false
//         }
//       }
//     ],
//     order: [
//       ["createdAt", "DESC"]
//     ]
//   }).then(function(dbMigraine) {
//     res.json(dbMigraine);
//   });
// });


// POST route to create new migraines when user clicks submit
router.post("/api/migraines", authCheck(), function(req, res) {
  db.Migraine.create({
    UserId: req.user.id,
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
    });  

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
      });
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
      });
    });

    res.json(dbMigraine);
  });
});   

// PUT route to update previous migraines
router.put("/api/migraines/:id", authCheck(), function(req, res) {
  console.log(req.params);
  db.Migraine.update(req.body,
    {    
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Treatment
        }
      ] 
  }).then(function(dbMigraine) {
    res.json(dbMigraine);
  });  
});  
  

// // to delete previous migraines
router.delete("/api/migraines/:id", authCheck(), function(req, res) {
  db.Migraine.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbMigraine) {
    res.json(dbMigraine);
  })
});

module.exports = router;