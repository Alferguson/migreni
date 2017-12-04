var express = require("express");
var db = require("../models");
var router = express.Router();
var authCheck = require("../authCheck.js");

router.get("/chart", authCheck(), function(req, res) {
  res.render("chartIntensity", { title: "Intensity Over Time", user: req.user });
});

router.get("/api/intensity", authCheck(), function(req, res) {
  console.log("req", req.query);
  var query = {
    UserId: req.user.id
  }
  if (req.query.end && req.query.start) {
    query.date = {
    	$between: [req.query.start, req.query.end]
    }
  }
  db.Migraine.findAll({
    where: query,
    order: ["date"],
    include: [db.Weather, db.Treatment]
  }).then(function(data) {
    res.json(data);
  })
});

module.exports = router;