var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('covid', { page:'etcovid', menuId:'home' });
});




module.exports = router;
