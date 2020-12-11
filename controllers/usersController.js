const router = require('express').Router();
const User = require('../models/user.js');

// JUST A TEST - DELETE THIS 
// ROUTE - List all users
router.get('/api/users', (req, res) => {
    User.find()
    // Return all Users as an Array
    .then((allUsers) => {
      res.status(200).json({ user: allUsers });
    })
    // Otherwise, return error
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});


// POST (create new user)
router.post('/api/users', (req, res) => {
    // console.log('req.body: ', req.body);
    // console.log('req.params: ', req.params);  
    User.create(req.body)
    // If successful, respond with 201
    .then((newUser) => {
      // res.status(201).json({ userName: newUser });
      res.status(201).end();
    })
    // Otherwise, return error
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});


// PUT (update existing user)
router.put('/api/users/:userId', (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.params: ', req.params);  

  // Find existing user
  User.findById(req.params.userId)
  // If successful, update row
  .then((userFound) => {
    if (userFound) {
      return userFound.updateOne(req.body);
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