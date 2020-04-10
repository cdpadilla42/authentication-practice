var express = require('express');
var router = express.Router();
const User = require('../user');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/signup', (req, res, next) => {
  res.render('sign-up-form');
});

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  });
});

module.exports = router;
