var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");

// GET route to display user name at user's page
router.get("/api/user/:id", function(req, res) {
  db.User.findOne({
  	// display username
  	username: username,
    // display all data where user id = database id
    where: {
      uuid: req.params.id
    }
  }).then(function(dbUser) {
  	// res.sendFile()
    // display on handlebars, may not work
    // res.json(dbUser).render("index", { user: dbUser });
        res.json(dbUser).sendFile(path.join(__dirname, "../views/test.html"));

  });
});

// POST route to create new users new account is set up with google OAuth
router.post("/api/user", function(req, res) {
  db.User.create({
    username: req.body.username,
    password_hash: req.body.password_hash,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender,
    age: req.body.age,
    // maybe birthday instead to calculate age
    location: req.body.location
  }).then(function(dbUser) {
    // HOW TO target user ID
    res.json(dbUser);
  });
});

// to delete user account 
router.delete("/api/user/:id", function(req, res) {
  db.User.destroy({
    where: {
      uuid: req.params.id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

module.exports = router;
