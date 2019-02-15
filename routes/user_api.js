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
                  password: hash
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
    db.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Login
  router.post('/login/:userId', passport.authenticate("local"), (req, res, next) => {
      db.User.findByIdAndUpdate( req.params.userId, 
      { active: true} 
      ,{ 
          new: true 
      })
      .then( (dbUser) => {
          res.send(dbUser)
      })
      .catch( err => {
          res.json(err);
      });
    res.json(req.user)
  });

  // Logout
  router.get('/logout/:userId', (req, res) => {
    db.User.findByIdAndUpdate( req.params.userId, 
      { active: false} 
      ,{ 
          new: true 
      })
      .then( (dbUser) => {
          console.log(dbUser)
      })
      .catch( err => {
          console.log(err)
      });
    req.logout();
    res.json(req.user)
  });

  router.get("/isLogin" , (req,res) => {
    res.json(req.user)
  })
module.exports = router;