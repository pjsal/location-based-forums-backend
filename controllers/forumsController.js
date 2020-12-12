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


// POST (create new forum)
router.post('/api/forums', (req, res) => {
  // console.log('req.body: ', req.body);
  // console.log('req.params: ', req.params);  
  Forum.create(req.body)
  // If successful, respond with 201
  .then((newForum) => {
    res.status(201).json({ forum: newForum });
    // res.status(201).end();
  })
  // Otherwise, return error
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});



// SHOW - return details for a specific forum 
router.get('/api/forums/:forumId', (req, res) => {

    Forum.findById(req.params.forumId)
    .then((thisForum) => {
      res.status(200).json({ forum: thisForum });
    })
    // Otherwise, return error
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});


// PUT (update existing forum)
router.put('/api/forums/:forumId', (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.params: ', req.params);  

  // Find existing forum
  Forum.findById(req.params.forumId)
  // If successful, update row
  .then((forumFound) => {
    if (forumFound) {
      return forumFound.updateOne(req.body);
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID doesn\'t match any documents'
        }
      });
    }
  })
  .then(() => {
    // If the update succeeded, return 204 and no JSON
    res.status(204).end();
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});



// POST (create new post)
router.post('/api/forums/:forumId/posts', (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.params: ', req.params);  

  // First, persist new post 
  Post.create(req.body)
  // If successful, respond with 201
  .then((newPost) => {
    // Then, find current forum the post is associated with
    Forum.findById(req.params.forumId) 
    // If successful
    .then((forumFound) => {
    if (forumFound) {
        // console.log('forumFound', forumFound)
        // console.log('newPost', newPost)
      
        // Push the new post into the current forums post array.
        forumFound.posts.push(newPost);
        // Save the forum
        forumFound.save() 
          .then(() => {
            res.status(204).end();
          })
          // Catch any errors that might occur
          .catch((error) => {
            res.status(500).json({ error: error });
          })
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID doesn\'t match any documents'
        }
      });
    }
  })
    res.status(201).json({ post: newPost });
    // res.status(201).end();
  })
  // Otherwise, return error
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});


// PUT (add user to forum)
router.put('/api/forums/:forumId/users/:userId', (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.params: ', req.params);  

  // Find existing forum
  Forum.findByIdAndUpdate(req.params.forumId,
    {
      $push: {
        users: req.params.userId,
      },
    },
    { new: true, upsert: true }
  )
  // If successful, update row
  .then((forumFound) => {
    if (forumFound) {
      res.status(200).json({ forum: forumFound })
    } else {
      // If we couldn't find a document with the matching ID
      res.status(404).json({
        error: {
          name: 'DocumentNotFoundError',
          message: 'The provided ID doesn\'t match any documents'
        }
      });
    }
  })
  .then(() => {
    // If the update succeeded, return 204 and no JSON
    res.status(204).end();
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});





module.exports = router;