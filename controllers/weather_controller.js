var express = require("express");
var db = require("../models");
var router = express.Router();

// POST route to create new weather associated with Migraine model
router.post("/api/weather/:id", function(req, res) {
  db.Weather.create({
    temp: req.body.temp,
    humidity: req.body.humidity,
    precip: req.body.precip,
    MigraineId: req.params.id
  }).then(function(dbWeather) {
    res.json(dbWeather);
  });
});

module.exports = router;