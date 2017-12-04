var express = require('express');
var router = express.Router();
var rootDir = { root: __dirname + '/..' };

// default route for index
router.get("/", function(req, res) {
  res.render("index", {loggedIn: req.isAuthenticated() });
});

// GET route to display the survey page
router.get("/user/:id", function(req, res) {
  res.render("survey");
});

// GET route to display the survey page
router.get("/user/history/:id", function(req, res) {
  res.render("history");
});

module.exports = router;