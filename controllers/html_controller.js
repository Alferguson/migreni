var express = require('express');
var db = require("../models");
var router = express.Router();
var authCheck = require("../authCheck.js")

function toFahrenheit(kelvin) {
    return ((9 / 5) * (kelvin - 273)  + 32);
}

// default route for index
router.get("/", function(req, res) {
  res.render("index", {loggedIn: req.isAuthenticated() });
});

// User homepage
router.get("/user", authCheck(), function(req, res) {
  db.Migraine.findAll({
    // display all migraines for id
    where: {
      UserId: req.user.id
    },
    include: [db.Treatment, db.Weather],
    // display by when they were created via descend
    order: [
      [["date", "DESC"]]
    ]
  }).then(function(data) {
    res.render("survey", {title: "home", user: req.user, migraines: data});
  });
});

// Log of user's migraines
router.get("/log", authCheck(), function(req, res) {
  db.Migraine.findAll({
    where: {
      UserId: req.user.id
    },
    include: [db.Treatment, db.Weather],
    order: [["updatedAt", "DESC"]]
  }
  ).then(function(data) {
    var size = data.length;
    for (var i = 0; i < size; i++) { 
      console.log(data[i]);
      console.log(data[i].dataValues);
    	data[i].dataValues.Weather.dataValues.temp = toFahrenheit(data[i].dataValues.Weather.dataValues.temp).toFixed(2);
    }
    res.render("log", {
      title: "Migraine Journal",
      user: req.user,
      migraines: data
    });
  });
});

module.exports = router;