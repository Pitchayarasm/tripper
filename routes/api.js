var express = require('express');
var router = express.Router();
var db = require("../models")
var middleware = require('node-paperclip').middleware
 
router.post('/post_profile_image',
 
    middleware.parse(),
 
  function(req, res, next) {
    req.body.profile_image.user_id  = req.user._id;
    req.body.profile_image.username = req.user.username;
    next();
  },
 
  function(req, res, next) {
 
    console.log(req.body);
 
    ProfileImage.findOne({username: req.user.username}, function(err, profile_image) {
      if (req.body.profile_image) {
        if (profile_image) {
          profile_image.remove(function(err) {
            next();
          });
        } else {
          next();
        }
      } else {
        res.redirect('/#profile/images');
      }
    });
  },
 
  function (req, res) {
    ProfileImage.create(req.body.profile_image, function(err, doc) {
      res.redirect('/#profile/images');
    });
})
 
 
module.exports = router;