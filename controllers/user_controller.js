var db = require("../models");

module.exports = function(app) {

  // GET route to display user name at user's page
  app.get("/user/:uuid", function(req, res) {
    db.User.findOne({
    	// display user_name
    	user_name: user_name
      // display all data where user uuid = database uuid
      where: {
        uuid: req.params.uuid
      },
    }).then(function(dbUser) {
      // display on handlebars, may not work
      res.json(dbUser).render("index", { user: dbUser });
    });
  });

  // POST route to create new users new account is set up with google OAuth
  app.post("/user", function(req, res) {
    // grab data from 4 questions, WHAT DO ABOUT MEDS AND WEATHER???
    db.Migraine.create({
      user_name: req.body.user_name,
      sex: req.body.sex,
      age: req.body.age,
      // maybe birthday instead to calculate age
      location: req.body.location
    }).then(function(dbUser) {
      // HOW TO target user ID
      res.json({ uuid: dbUser.uuid });
    });
  });

  // to delete user account 
  app.delete("/user/:uuid", function(req, res) {
    db.User.destroy({
      where: {
        uuid: req.params.uuid
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};