var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");
// GET 
router.get("/", function(req, res) {
  // res.sendFile(path.join(__dirname, "../views/test.html"));
});
module.exports = router;