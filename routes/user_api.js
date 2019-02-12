const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models")

// Register
  router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
        db.User.findOne({ email: email })
        .then( user => {
          if (user) {
            res.json({ msg: "This email is already exist" , firstName, lastName, email, password });

          } else {
            bcrypt.hash( password, 10 , (err,hash) => {
              if (err) throw err;
              db.User.create({
                  firstName,
                  lastName,
                  email,
                  password: hash,
                  active: true
              })
              .then((dbUser) => {
                  res.json(dbUser);
                  console.log(dbUser);
              })
              .catch((err) => {
                  res.json(err);
              });
            });
          }
      });
  });

  // Login
  router.post('/login', (req, res, next) => {
    passport.use( new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      db.User.findOne({
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
              let { _id ,firstName, lastName, email, active } = user,
                  payload = { _id ,firstName, lastName, email, active };
                  console.log(payload);
                  return res.json(payload);
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
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
      })(req, res, next);
  });

  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
  });

module.exports = router;