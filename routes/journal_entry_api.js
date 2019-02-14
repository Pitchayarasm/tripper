const express = require('express');
const router = express.Router();
const db = require("../models")
const multiparty = require('connect-multiparty')();
const User = require('../models/user');
const fs = require('fs');
const mongoose = require('mongoose');
const Gridfs = require('gridfs-stream');

// upload pics to entry
// router.post('/upload/:id', multiparty, function(req, res){
//     console.log(req.files)
//    let db = mongoose.connection.db;
//    let mongoDriver = mongoose.mongo;
//    let gfs = new Gridfs(db, mongoDriver);
//    let writestream = gfs.createWriteStream({
//      filename: req.files.image.name,
//      mode: 'w',
//      content_type: req.files.image.mimetype,
//      metadata: req.body
//    });

//    fs.createReadStream(req.files.image.path).pipe(writestream);
//    writestream.on('close', function(file) {
//       User.findById(req.params.id, function(err, user) {
//         // handle error
//         user.file = file._id;
//         user.save(function(err, updatedUser) {
//           // handle error
//           return res.json(200, updatedUser)
//         })
//       });
//       fs.unlink(req.files.image.path, function(err) {
//         // handle error
//         console.log('success!')
//       });
//    });
// });

// // get pic
// router.get('/upload/:id', function(req, res) {
//     let db = mongoose.connection.db;
//     let mongoDriver = mongoose.mongo;
//     let gfs = new Gridfs(db, mongoDriver);
//     let readstream = gfs.createReadStream({
//         _id: req.params.id
//     });
//     readstream.pipe(res);
// });

// add entry
router.post("/entry/:journalId", (req, res) => {
    db.Entry.create(req.body)
    .then( dbEntry => {
        return  db.Journal.findByIdAndUpdate( req.params.journalId, 
                { $push: 
                    { entries: dbEntry._id } 
                },{ 
                    new: true 
                })
                .then( dbJournal => {
                    res.json(dbJournal);
                })
                .catch( err => {
                    res.json(err);
                });
    });
});

// add journal
router.post("/journal/:userId", (req, res) => {
    db.Journal.create(req.body)
    .then( dbJournal => {
        return  db.User.findByIdAndUpdate( req.params.userId, 
                { $push: 
                    { journals: dbJournal._id } 
                },{ 
                    new: true 
                })
                .then( dbUser => {
                    res.json(dbUser);
                })
                .catch( err => {
                    res.json(err);
                });
    });
});

// get journal
router.get("/journal/:userId", function(req, res) {
    db.User.find({
        _id : req.params.userId
    })
      .populate({
          path : "journals",
          populate : {
              path: "entries"
          }
      })
      .then(function(userDb) {
        res.json(userDb);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

module.exports = router;