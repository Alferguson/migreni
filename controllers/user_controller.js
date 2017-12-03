var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");
var bcrypt = require('bcrypt');
const passport = require("passport");
var authCheck = require("../authCheck.js");
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
const saltRounds = 10;

router.get("/register", function(req, res) {
  res.render("register", { title: "Registration" });
});

router.get("/session", authCheck(), function(req, res) {
  res.render("sessionTest", {
    title: "Session Test",
    id: req.user.id,
    name: req.user.username
  })
})

// GET route to display user name at user's page
router.get("/api/user", authCheck(), function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  db.User.findOne({
    // display all data where user id = database id
    where: {
      id: req.user.id
    },
  }).then(function(dbUser) {
    // res.sendFile()
    // display on handlebars, may not work
    // res.json(dbUser).render("index", { user: dbUser });
    res.json(dbUser);

  }).catch(function(err) {

  });
});

function isEntryUnique(set) {
  return db.User.count({
    where: set,
  }).then(function(count) {
    console.log("found " + count + " of " + set)
    if (count !== 0) {
      return false;
    }
    return true;
  });
}

// POST route to create new users new account is set up with google OAuth
router.post("/register", [
  check('username')
  .exists().withMessage('Username is required.')
  .isLength({ min: 4, max: 15 }).withMessage('Usernames must be between 4 and 15 characters.')
  .custom((value) =>
    isEntryUnique({ username: value })
  ).withMessage('Username is taken')
  .trim(),
  check('password')
  .exists().withMessage('Password is required.')
  .isLength({ min: 8 }).withMessage('Passwords must be at least 8 characters')
  .trim(),
  check('email')
  .isEmail().withMessage('Email requires valid format.')
  .trim()
  .normalizeEmail()
  .custom((value) => {
    if (value) {
      isEntryUnique({ email: value })
    }
    return true;
  }).withMessage('Email is already in use'),
  check('age')
  .isNumeric().withMessage('Age must be a number')
  .toInt()
  .custom((value) =>
    value > 0
  ).withMessage('Age must be positive'),
], function(req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    res.render('index', { errors: errors.array(), loggedIn: req.isAuthenticated() });
  } else {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      req.body.password = hash;
      db.User.create(req.body).then(function(dbUser) {
        // HOW TO target user ID
        var user = {
          username: dbUser.username,
          id: dbUser.id,
        }
        req.login(user, function(err) {
          if (err) throw err;
          console.log("logged in " + req.user.id);
          console.log("req.user name " + req.user.username);
          res.redirect("/loginSuccess");
        });
      }).catch(function(err) {

      });
    });
  }
});

router.get("/login", function(req, res) {
  res.render("loginPage", { title: "Login" })
});

router.get("/loginSuccess", function(req, res) {
  req.session.save(function() {
    res.redirect("/user/" + req.user.id);
  });
});

router.post("/login",
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/login'
  }));

router.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy(function() {
    res.redirect("/");
  });
});

router.get("/user/update", authCheck(), function(req, res) {
  res.render("updateUser", {title: "update", loggedIn: req.isAuthenticated()})
})

router.put("/user/updateUser", authCheck(), function(req, res) {

})
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