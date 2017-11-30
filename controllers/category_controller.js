var express = require("express");
var db = require("../models");
var router = express.Router();
var path = require("path");

// POST route to create new category when user clicks submit
router.post("/api/category/:id", function(req, res) {
  db.Category.create({
    name: req.body.name
  }).then(function(dbCategory) {
    // HOW TO target user ID
    res.json(dbCategory);
  });
});
// PUT route for updating category
router.put("/api/category", function(req, res) {
  db.Category.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
});  
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/test.html"));
});
module.exports = router;