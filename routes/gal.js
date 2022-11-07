var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
var hash = require('pbkdf2-password')()
var session = require('express-session');
var Storage = require('../lib/storage');
const storage = new Storage();
var users = {
  ws: { name: 'ws' }
};
hash({ password: 'rendiren' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.ws.salt = salt;
  users.ws.hash = hash;
});
function authenticate(name, pass, fn) {
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(null, null)
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(null, null)
  });
}
function restrict(req, res, next) {
  if (req.cookies.ciss) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/gal/login');
  }
}

var foto = exports.foto = [];
foto.push({ name: 'Kids', path: 'kids.png', id: 1 });
foto.push({ name: 'Loki 1', path: 'dog1.png', id: 2 });
foto.push({ name: 'Loki 2', path: 'dog2.png', id: 3 });
foto.push({ name: 'Loki 3', path: 'dog3.png', id: 4 });
foto.push({ name: 'Loki 2', path: 'dog2.png', id: 5 });
foto.push({ name: 'Loki 3', path: 'dog3.png', id: 6 });

/* GET users listing. */
router.get('/', restrict, function(req, res){
  res.render('gallist', { title: 'Gallery', foto: foto });
});
router.get('/del/:id',restrict,function(req, res, next) {
  res.render('del', {id: req.params.id});
});
router.get('/img/:name', restrict, async function(req, res){
  const stream = storage.getStream(req.params.name);
  return stream.pipe(res);
})
router.get('/logout', function(req, res){
    res.clearCookie('ciss');
    req.session.destroy(function(){
    res.redirect('/gal/login');
  });
});
router.get('/login', function(req, res){
  res.render('gallogin');
});
router.post('/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
      req.session.regenerate(function(){
        res.cookie('ciss', user, { maxAge: 86400000 })
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/gal/logout">logout</a>. '
          + ' You may now access <a href="/gal">/gal</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.';
      res.redirect('/gal/login');
    }
  });
});

module.exports = router;
