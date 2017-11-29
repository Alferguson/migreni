var db = require("../models");

module.exports = function(app) {

  // GET route to display user name at user's page
  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({
    	// display username
    	username: username
      // display all data where user id = database id
      where: {
        uuid: req.params.id
      },
    }).then(function(dbUser) {
      // display on handlebars, may not work
      res.json(dbUser).render("index", { user: dbUser });
    });
  });

  // POST route to create new users new account is set up with google OAuth
  app.post("/api/user", function(req, res) {
    // grab data from 4 questions, WHAT DO ABOUT MEDS AND WEATHER???
    db.User.create({
      username: req.body.username,
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
  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({
      where: {
        uuid: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};