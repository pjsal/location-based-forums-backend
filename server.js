
// DEPENDENCIES

// Needed for environment variables
require('dotenv').config()    // This needs to be at the very top
const express = require('express');
const mongoose = require ('mongoose');
const app = express ();
const cors = require('cors');
const db = mongoose.connection;
// Environment variable assignments
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODBURI;
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'locationBasedForums';

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});


// MIDDLEWARE

// Path for CSS, images, or any other items
app.use(express.static('public'));
//  Not sure if needed, but installed it anyway
app.use(cors());
// Body parser - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.json());
// Define path for user routes and link to control file
app.use('/users', require('./controllers/usersController.js'));
// Define path for forum routes and link to control file
app.use('/forums', require('./controllers/forumsController'));
// Seed DB 
app.use('/seed', require('./seeds/seedDB.js'));
// Clear all collections
app.use('/clear', require('./seeds/clearCollections.js'));


app.listen(PORT, () => console.log( 'Listening on port:', PORT));