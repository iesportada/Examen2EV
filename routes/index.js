var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express desde mi examen' });
});

/*
router.get('*', function (req, res) {
  res.redirect('/');
});
*/
module.exports = router;
