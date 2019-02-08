const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Paperclip = require('node-paperclip');

const travelPic = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    username: String,
    entry_id: {type: Schema.Types.ObjectId, ref: 'Entry'}
});

travelPic.plugin(Paperclip.plugins.mongoose, {
    travel_image: {
        styles: [
            { original: true },
            { thumb: { width: 100, height: 100, modifier: '#' } }
        ]
    }
})

module.exports = mongoose.model('travelPic', travelPic);