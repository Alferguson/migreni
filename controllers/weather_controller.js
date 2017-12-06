var express = require("express");
var db = require("../models");
var router = express.Router();
var authCheck = require("../authCheck.js")


// POST route to create new users new account is set up with google OAuth
router.post("/api/weather/:id", authCheck(), function(req, res) {
  db.Weather.create({
    temp: req.body.temp,
    humidity: req.body.humidity,
    precip: req.body.precip,

    MigraineId: req.params.id
  }).then(function(dbWeather) {
    // HOW TO target user ID
    console.log(dbWeather);

    res.json(dbWeather);
  });
});

module.exports = router;
