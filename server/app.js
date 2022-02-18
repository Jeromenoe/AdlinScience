const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();

// ROUTES IMPORTS
const meetingRoomsRoutes = require('./routes/meetingRooms.js');
const slotsMeetingRoomsRoutes = require('./routes/slotsMeetingRooms.js');

const app = express();

// Initialize DB
require('./initDB')();

// ALLOW API TO BE CALLED
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', meetingRoomsRoutes);
app.use('/api', slotsMeetingRoomsRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Listening on port : ${PORT}`)
});