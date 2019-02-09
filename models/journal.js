var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var JournalSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is Required"
    }, 
    entries: [
        {
          type: Schema.Types.ObjectId,
          ref: "Entry"
        }
    ]
});

var Journal = mongoose.model("Journal", JournalSchema);
module.exports = Journal;