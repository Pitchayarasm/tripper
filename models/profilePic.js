const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Paperclip    = require('node-paperclip');
 
const ProfilePic = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String
});
 
ProfilePic.plugin(Paperclip.plugins.mongoose, {
  profile_image: {
    avatar: { 
      styles: [
        { original: true },
        { tiny:     { width: 50,  height: 50,  modifier: '#' } },
        { thumb:    { width: 100, height: 100, modifier: '#' } },
        { profile:  { width: 200, height: 200, modifier: '#' } }
      ],
      prefix:      '{{plural}}/{{document.username}}',
      name_format: '{{style}}.{{extension}}'
    }
  }
})
 
module.exports     = mongoose.model('ProfilePic', ProfilePic);