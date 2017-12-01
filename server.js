var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");
var doseRoutes = require("./controllers/dose_controller");
var migraineRoutes = require("./controllers/migraine_controller");
var treatmentRoutes = require("./controllers/treatment_controller");
var userRoutes = require("./controllers/user_controller");
var weatherRoutes = require("./controllers/weather_controller");
var htmlRoutes = require("./controllers/html_controller");
var db = require("./models");
//Authentication 
var expressValidator = require("express-validator");
var session = require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcrypt');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(expressValidator());
app.use(cookieParser());

// Static directory
app.use(express.static("public"));

//Authentication setup
app.use(session({
  secret: 'ubu9fhv9b33v8hq0e3q', // should be generated with random string generator
  store: new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  	expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
  }),
  resave: false,
  // saveUninitialized: true,
  // cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy((username, password, done) => {

//   db.User.findAll({
//   	attributes: [id, password],
//   	where: 
//   		{username: username}
//   },
//    (results) => {

//     if (results.length === 0) {
//       return done(null, false);
//     } else {
//       const hash = results[0].password.toString();

//       bcrypt.compare(password, hash, (err, response) => {
//         if (response === true) {
//           return done(null, { user_id: results[0].id });
//         } else {
//           return done(null, false);
//         }
//       });
//     }
//   });
// }));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", doseRoutes);
app.use("/", migraineRoutes);
app.use("/", treatmentRoutes);
app.use("/", userRoutes);
app.use("/", weatherRoutes);
app.use("/", htmlRoutes);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});