const mongoose = require('mongoose');
const Forum = require('./forumAndPost.js');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    deviceToken: {
        type: String
    },
    forums: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Forum',
        },
    ],
}, { timestamps: true });
  
// These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.
module.exports = mongoose.model('User', userSchema);
  