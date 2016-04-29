var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ppt' });
});

router.get('/timeline', function(req, res, next) {
  res.render('timeline', { title: 'timeline' });
});

module.exports = router;
