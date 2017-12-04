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
  }).then(function(dbMigraine) {
    data[0].dataValues.Weather.dataValues.temp = toFahrenheit(data[0].dataValues.Weather.dataValues.temp).toFixed(2);
    res.render("survey", {title: "home", user: req.user, migraines: dbMigraine});
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
  	console.log(data[0].dataValues.Weather.dataValues.temp);
  	data[0].dataValues.Weather.dataValues.temp = toFahrenheit(data[0].dataValues.Weather.dataValues.temp).toFixed(2);
    res.render("log", {
      title: "Migraine Journal",
      user: req.user,
      migraines: data
    });
  });
});

module.exports = router;