var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");
var bcrypt = require('bcrypt');
const saltRounds = 10;

// GET route to display user name at user's page
router.get("/api/user/:id", function(req, res) {
  db.User.findOne({
    // display username
    username: username,
    // display all data where user id = database id
    where: {
      id: req.params.id
    },
  }).then(function(dbUser) {
    // res.sendFile()
    // display on handlebars, may not work
    // res.json(dbUser).render("index", { user: dbUser });
    res.json(dbUser).sendFile(path.join(__dirname, "../views/test.html"));

  });
});

// POST route to create new users new account is set up with google OAuth
router.post("/api/user", function(req, res) {
  
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    req.body.password = hash;
    db.User.create(req.body).then(function(dbUser) {
      // HOW TO target user ID
      res.json(dbUser);
    });
  });
});

// to delete user account 
router.delete("/api/user/:id", function(req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/test.html"));
});

module.exports = router;