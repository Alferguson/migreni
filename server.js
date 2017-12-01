var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");
var doseRoutes = require("./controllers/dose_controller");
var migraineRoutes = require("./controllers/migraine_controller");
var treatmentRoutes = require("./controllers/treatment_controller");
var userRoutes = require("./controllers/user_controller");
var weatherRoutes = require("./controllers/weather_controller");
var htmlRoutes = require("./controllers/html_controller");
var db = require("./models");

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

// Static directory
app.use(express.static("public"));



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