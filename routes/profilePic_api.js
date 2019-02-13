// const express = require('express');
// const router = express.Router();
// const multiparty = require('connect-multiparty')();
// const User = require('../models/User');
// const fs = require('fs');
// const mongoose = require('mongoose');
// const Gridfs = require('gridfs-stream');

// // upload pics
// router.post('/upload/:id', multiparty, function(req, res){
//    const db = mongoose.connection.db;
//    const mongoDriver = mongoose.mongo;
//    const gfs = new Gridfs(db, mongoDriver);
//    const writestream = gfs.createWriteStream({
//      filename: req.files.file.name,
//      mode: 'w',
//      content_type: req.files.file.mimetype,
//      metadata: req.body
//    });

//    fs.createReadStream(req.files.file.path).pipe(writestream);
//    writestream.on('close', function(file) {
//       User.findById(req.params.id, function(err, user) {
//         // handle error
//         user.file = file._id;
//         user.save(function(err, updatedUser) {
//           // handle error
//           return res.json(200, updatedUser)
//         })
//       });
//       fs.unlink(req.files.file.path, function(err) {
//         // handle error
//         console.log('success!')
//       });
//    });
// });

// // get pic
// router.get('/download/:id', function(req, res) {
//   var readstream = gfs.createReadStream({
//      _id: req.params.id
//   });
//   readstream.pipe(res);
// });

// module.exports = router;