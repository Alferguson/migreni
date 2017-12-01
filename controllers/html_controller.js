var express = require('express');


var router = express.Router();
var rootDir = { root: __dirname + '/..' };


// default route for home.html
router.get('/', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
    res.sendFile('/views/index.html', rootDir);
});

// GET route to display the survey page
//TODO: id mandatory
router.get('/user/:id?', function(req, res) {
    res.sendFile('/views/test.html', rootDir);
});



module.exports = router;