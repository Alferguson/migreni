var express = require("express");
var db = require("../models");
var router = express.Router();
var authCheck = require("../authCheck.js");

router.get("/chart", authCheck(), function(req, res) {
	res.render("chartIntensity", {title: "Intensity Over Time", user: req.user});
});

router.get("/api/intensity", authCheck(), function(req, res) {
	db.Migraine.findAll({
		where: {
			UserId: req.user.id
		},
		attributes: ["date", "intensity"],
		order: ["date"]
	}).then(function(data) {
		res.json(data);
	})
});

module.exports = router;