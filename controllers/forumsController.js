const router = require('express').Router();
const User = require('../models/user.js');
const Forum = require('../models/forumAndPost.js').Forum;  
const Post = require('../models/forumAndPost.js').Post;  


// THIS CAN EVENTUALLY BE DELETED ONCE I FIGURE OUT HOW TO RETURN ONLY ONES WITHIN RANGE
// ROUTE - List all forums
router.get('/api/forums', (req, res) => {
    Forum.find()
    // Return all Forums as an Array
    .then((allForums) => {
      res.status(200).json({ forum: allForums });
    })
    // Otherwise, return error
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});


// SHOW - return details for a specific forum 
router.get('/api/:forumId', (req, res) => {

    Forum.findById(req.params.forumId)
    .then((thisForum) => {
      res.status(200).json({ forum: thisForum });
    })
    // Otherwise, return error
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});



module.exports = router;