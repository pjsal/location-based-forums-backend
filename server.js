
// DEPENDENCIES

// Needed for environment variables
require('dotenv').config()    // This needs to be at the very top
const express = require('express');
const mongoose = require ('mongoose');
const app = express ();
const cors = require('cors');
const db = mongoose.connection;
// Environment variable assignments
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODBURI;

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
app.use('/forums', require('./controllers/forumController'));
// Seed Category collection
app.use('/seed', require('./seeds/seedDB.js'));


app.listen(PORT, () => console.log( 'Listening on port:', PORT));