const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models")

// Register
  router.post('/register', (req, res) => {
    const { firstname, lastname, email, password, password2 } = req.body;
    let errors = [];

    if (!firstname || !lastname || !email || !password || !password2) {
      errors.push({ message : 'Please enter all fields' });
    }

    if (password != password2) {
      errors.push({ message : 'Passwords do not match' });
    }

    if (errors.length > 0) {
      res.json({ errors, firstname, lastname, email, password, password2 });

    } else {
        db.User.findOne({ email: email })
        .then( user => {
          if (user) {
            errors.push({ message : 'Email already exists' });
            res.json({ errors, firstname, lastname, email, password, password2 });

          } else {
            const newUser = new User({
              firstname,
              lastname,
              email,
              password
            });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password , salt, ( err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then( user => {
                  res.redirect('/users/login');
                })
                .catch( err => console.log(err) );
            });
          });
        }
      });
    }
  });

  // Login
  router.post('/login', (req, res, next) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      })
      .then( user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        } else {
          // Match password
          bcrypt.compare( password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        }
      });
    }))

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
    
      passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
  });

  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
  });

module.exports = router;