var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");
var bcrypt = require('bcrypt');
const expressValidator = require("express-validator");
const passport = require("passport");
const saltRounds = 10;

router.get("/register", function(req, res) {
  res.render("register", {title: "Registration"});
})

// GET route to display user name at user's page
router.get("/api/user/:id", function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  db.User.findOne({
    // display all data where user id = database id
    where: {
      id: req.params.id
    },
  }).then(function(dbUser) {
    // res.sendFile()
    // display on handlebars, may not work
    // res.json(dbUser).render("index", { user: dbUser });
    res.json(dbUser).sendFile(path.join(__dirname, "../views/test.html"));

  }).catch(function(err) {

  });
});

// POST route to create new users new account is set up with google OAuth
router.post("/api/user", function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    req.body.password = hash;
    db.User.create(req.body).then(function(dbUser) {
      // HOW TO target user ID
      req.login(dbUser, function(err) {
        if (err) throw err;
        console.log("logged in " + req.user.id);
        console.log("req.user name " + req.user.username);
        return res.redirect("/api/user/" + dbUser.id);
      });
    }).catch(function(err) {

    });
  });
});


passport.serializeUser((user_id, done) => {
  done(null, user_id);
});

passport.deserializeUser((user_id, done) => {
  done(null, user_id)
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

module.exports = router;
