var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");

// GET route to display user name at user's page
router.get("/api/weather/:id", function(req, res) {
  db.Weather.findOne({
  	// display username
  	temp: temp,
    humidity: humidity,
    precip: precip,        
    // display all data where user id = database id
    where: {
      uuid: req.params.id
    }
  }).then(function(dbWeather) {
  	// res.sendFile()
    // display on handlebars, may not work
    // res.json(dbWeather).render("index", { user: dbWeather });
        res.json(dbWeather).sendFile(path.join(__dirname, "../views/test.html"));

  });
});

// POST route to create new users new account is set up with google OAuth
router.post("/api/weather/:id", function(req, res) {
  db.Weather.create({
    temp: req.body.temp,
    humidity: req.body.humidity,
    precip: req.body.precip,
    where: {
      migraineId: req.params.id
    }
  }).then(function(dbWeather) {
    // HOW TO target user ID
    res.json(dbWeather);
  });
});

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/test.html"));
});
module.exports = router;
