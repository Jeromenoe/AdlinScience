const express = require('express');
const path = require('path');
const meetingRoomsRoutes = require('./routes/meetingRooms.js')

const logger = (req, res, next) => {
	console.log('this is my log');
	next();
}

const app = express();

const PORT = process.env.PORT || 3001;


app.use(logger);

app.use('/api', meetingRoomsRoutes);


app.listen(PORT, () => console.log(`Listening on port : ${PORT}`));