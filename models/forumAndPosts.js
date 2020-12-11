const mongoose = require('mongoose');
const User = require('./user.js');

const postSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    author: {
      type: String,
    },
}, { timestamps: true });

const forumSchema = new mongoose.Schema({
    identNum: {
      type: Number,
    },
    name: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // embed posts in forum
    posts: [postSchema],
    },
    { timestamps: true }
  );
  
// These need to be singular and first letter capitalized as Mongo/Mongoose will name the collection with a lowercase first letter and pluralize it.

const Forum = mongoose.model('Forum', forumSchema);

const Post = mongoose.model('Post', postSchema);

module.exports = { Forum, Post };