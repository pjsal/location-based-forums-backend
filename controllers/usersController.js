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


// POST (create new user) - no page; just an action which will add a new entry
router.post('/api/users', (req, res) => {
    console.log('req.body: ', req.body);
    console.log('req.params: ', req.params);  
    User.create(req.body)
    // If successful, respond with 201
    .then((newUser) => {
      res.status(201).json({ userName: newUser });
    })
    // Otherwise, return error
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
  
module.exports = router;