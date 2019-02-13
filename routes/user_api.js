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
            res.json({ msg: "This email has already been registered." , firstName, lastName, email, password });

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

  passport.use( new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match user
    db.User.findOne({
      email: email
    })
    .then( user => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered.' });
      } else {
        // Match password
        bcrypt.compare( password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Password incorrect.' });
          }
        });
      }
    });
  }))

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log(id)
    db.User.findById(id, function(err, user) {
      console.log(user)
      done(err, user);
    });
  });

  // Login
  router.post('/login', passport.authenticate("local"), (req, res, next) => {
    res.json(req.user)
  });

  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.user)
    res.json(req.user)
  });

  router.get("/isLogin" , (req,res) => {
    console.log(req.user)
    res.json(req.user)
  })
module.exports = router;