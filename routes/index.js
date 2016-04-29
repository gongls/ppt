var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'coding 4 fun',next:'/page/2' });
});

router.get('/timeline', function(req, res, next) {
  res.render('timeline', { title: 'timeline' });
});

router.get('/page/2', function(req, res, next) {
  res.render('page2', { title: '' ,next:'/page/3'});
});

router.get('/page/3', function(req, res, next) {
  res.render('page3', { title: '' ,next:'/page/4'});
});
module.exports = router;
