const router = require('express').Router();
const mongoose = require('mongoose'); 
const Forum = require('../models/forumAndPost.js').Forum;  
const Post = require('../models/forumAndPost.js').Post;  
const User = require('../models/user.js');

router.get('/clearCollections', async (req, res) => {

    const deletePosts = await Post.deleteMany();
    const deleteForums = await Forum.deleteMany();
    const deleteUsers = await User.deleteMany();

  res.send("Collections cleared");
})

module.exports = router;