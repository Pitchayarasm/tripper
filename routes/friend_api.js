const express = require('express');
const router = express.Router();
const db = require("../models")

app.post("/submit:userId:friendId", function(req, res) {
    db.User.findByIdAndUpdate(
        req.params.userId, 
        {  friends: db.User.friendId  }, { new: true });
});

module.exports = router;