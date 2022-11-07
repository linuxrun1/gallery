var express = require('express');
var router = express.Router();
var path = require('path');

var db = require('../db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gallery', foto: db.foto });
});
router.get('/img/:png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/images/'+req.params.png));
});
module.exports = router;
