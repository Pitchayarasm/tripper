const express = require('express');
const router = express.Router();
const db = require("../models")

// add friend to user
router.post("/submit/:userId/:friendId", function(req, res) {
    db.User.findByIdAndUpdate(
        req.params.userId, 
        { $push: 
            { friends : req.params.friendId }
        }, { new: true }
    ).then( data => {
        console.log(data)
        res.end();
    }).catch( err => {
        console.log(err)
    })
    ;
})

// populate friends
router.get("/friendList/:userId", function(req, res) {
    db.User.find({
        _id : req.params.userId
    })
      .populate({
          path : "friends",
          populate : {
              path: "journals",
              populate : {
                  path : "entries"
              }
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