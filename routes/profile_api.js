const express = require('express');
const router = express.Router();
const multiparty = require('connect-multiparty')();
const User = require('../models/user');
const fs = require('fs');
const mongoose = require('mongoose');
const Gridfs = require('gridfs-stream');

// upload pics
router.post('/upload/:id', multiparty, function(req, res){
    console.log(req.files)
   let db = mongoose.connection.db;
   let mongoDriver = mongoose.mongo;
   let gfs = new Gridfs(db, mongoDriver);
   let writestream = gfs.createWriteStream({
     filename: req.files.image.name,
     mode: 'w',
     content_type: req.files.image.mimetype,
     metadata: req.body
   });

   fs.createReadStream(req.files.image.path).pipe(writestream);
   writestream.on('close', function(file) {
      User.findById(req.params.id, function(err, user) {
        // handle error
        user.file = file._id;
        user.save(function(err, updatedUser) {
          // handle error
          return res.json(200, updatedUser)
        })
      });
      fs.unlink(req.files.image.path, function(err) {
        // handle error
        console.log('success!')
      });
   });
});

// get pic
router.get('/upload/:id', function(req, res) {
    let db = mongoose.connection.db;
    let mongoDriver = mongoose.mongo;
    let gfs = new Gridfs(db, mongoDriver);
    let readstream = gfs.createReadStream({
        _id: req.params.id
    });
    readstream.pipe(res);
});

router.post("/aboutme/:userId" , (req,res) => {
    User.findByIdAndUpdate( req.params.userId, 
    { about_me: req.body.about_me } 
    ,{ 
        new: true 
    })
    .then( (dbUser) => {
        res.send(dbUser)
    })
    .catch( err => {
        res.json(err);
    });
})


module.exports = router;