const router = require('express').Router();
const mongoose = require('mongoose'); 
const Forum = require('../models/forumAndPost.js').Forum;  
const Post = require('../models/forumAndPost.js').Post;  
const User = require('../models/user.js');

router.get('/seedDB', async (req, res) => {

  // Create Posts
  const post1 = await Post.create({
    message: "Great Game",
    author: "FootBallBoy",
  });
  const post2 = await Post.create({
    message: "The Eagles are loosing, yes!!",
    author: "FanMan123",
  });
  const post3 = await Post.create({
    message: "This will knock them out of the playoffs",
    author: "FanMan123",
  });

  const post10 = await Post.create({
    message: "The concert is awesome",
    author: "Qwert",
  });
  const post11 = await Post.create({
    message: "This is the third time I've seen them",
    author: "BandTime",
  });
  const post12 = await Post.create({
    message: "I'm drunk",
    author: "Funtime321",
  });

  
  // Create Forums
  const forumLinFinField = await Forum.create({
    identNum: 1,
    name: 'Cowboys Fans',
    latitude: 39.900591442482494, 
    longitude: -75.16813147666544,
    users: [],
    posts: [],
  });

  const forumLinFinFieldEagles = await Forum.create({
    identNum: 1,
    name: 'Eagles Fans',
    latitude: 39.90126635803006,  
    longitude: -75.16671527038092,
    users: [],
    posts: [],
  });
  
  const forumXfinityLive = await Forum.create({
    identNum: 2,
    name: 'DMB Tribute',
    latitude: 39.904310859720624, 
    longitude: -75.16952446714895,
    users: [],
    posts: [],
  });

  const forumWellsFargoCenter = await Forum.create({
    identNum: 3,
    name: '76ers Game',
    latitude: 39.90124993847163,  
    longitude: -75.17204076074462,
    users: [],
    posts: [],
  });

  const forumCitizensBankPark = await Forum.create({
    identNum: 4,
    name: 'Phillies Game',
    latitude: 39.90617240019453,  
    longitude: -75.16651666000737,
    users: [],
    posts: [],
  });
  

  // Create Users
  let pwd = '123';

  const user1 = new User({
    userName: 'FootBallBoy',
    password: pwd,
    deviceToken: null,
    forums: [],
  });

  const user2 = new User({
    userName: 'FanMan123',
    password: pwd,
    deviceToken: null,
    forums: [],
  });

  const user10 = new User({
    userName: 'Funtime321',
    password: pwd,
    deviceToken: null,
    forums: [],
  });

  const user11 = new User({
    userName: 'BandTime',
    password: pwd,
    deviceToken: null,
    forums: [],
  });

  const user12 = new User({
    userName: 'Qwert',
    password: pwd,
    deviceToken: null,
    forums: [],
  });

  const user13 = new User({
    userName: 'HowYouDoin',
    password: pwd,
    deviceToken: null,
    forums: [],
  });

  // Persist Users
  user1.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });

  user2.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });
  
  user10.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });
  user11.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });
  user12.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });
  user13.save(function (err, savedUser) {
    if (err) {
      console.log(err);
    } else {
      console.log('User is ', savedUser);
    }
  });


  // Push some users and posts into the forumLinFinField forum
  forumLinFinField.users.push(user1);
  forumLinFinField.users.push(user2);
  forumLinFinField.posts.push(post1);
  forumLinFinField.posts.push(post2);
  forumLinFinField.posts.push(post3);
  forumLinFinField.save(function (err, savedForum) {
    if (err) {
      console.log(err);
    } else {
      console.log('Forum is ', forumLinFinField);
    }
  });

  // Push some users and posts into the forumXfinityLive forum
  forumXfinityLive.users.push(user10);
  forumXfinityLive.users.push(user11);
  forumXfinityLive.users.push(user12);
  forumXfinityLive.users.push(user13);
  forumXfinityLive.posts.push(post10);
  forumXfinityLive.posts.push(post11);
  forumXfinityLive.posts.push(post12);
  forumXfinityLive.save(function (err, savedForum) {
    if (err) {
      console.log(err);
    } else {
      console.log('Forum is ', forumXfinityLive);
    }
  });


  res.send("Database seeded");
})

module.exports = router;