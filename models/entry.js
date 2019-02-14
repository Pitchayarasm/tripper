var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EntrySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    }, 
    body: {
        type: String
    },
    location: {
        type: String
    },
    likes : {
        type: Number,
        default: 0 
    },
    dislikes : {
        type: Number,
        default: 0 
    },
    privacy: {
        type: String,
        default: "semi-private"
    },
    date: {
        type: Date,
        match: [/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, "Please enter a valid date DD/MM/YYYY"]
    },
    file: {
        type: String
    }
});

var Entry = mongoose.model("Entry", EntrySchema);

module.exports = Entry;