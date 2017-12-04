var express = require('express');
var db = require("../models");
var router = express.Router();
var authCheck = require("../authCheck.js")

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

    res.render("log", {
      title: "Migraine Journal",
      user: req.user,
      migraines: data
    });
  });
});

module.exports = router;