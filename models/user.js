var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: "Firstname is Required"
    }, 
    lastName: {
        type: String,
        trim: true,
        required: "Lastname is Required"
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        match: [/.{8,}/ ,"Password must be at least 8 characters."]
    },
    status: {
        type: String,
        default: "normal"
    },
    active: {
        type: Boolean,
        default: false
    },
    file: {
        type: String
    },
    journals: [
        {
          type: Schema.Types.ObjectId,
          ref: "Journal"
        }
    ],
    friends: [ this ],
    userCreated: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
