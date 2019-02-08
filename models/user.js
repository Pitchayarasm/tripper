var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fiestname: {
        type: String,
        trim: true,
        required: "Firstname is Required"
    }, 
    lastname: {
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
        match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
            "Please input a valid password. Your password must be 8-16 characters long and have at least one of each:"
        + "Upper case letter\nLower case letter\nNumber\nSpecial character"]
    },
    status: {
        type: String,
        default: "normal"
    },
    active: {
        type: Boolean,
        default: false
    },
    avatar: [
        {
          type: Schema.Types.ObjectId,
          ref: "ProfilePic"
        }
    ],
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
