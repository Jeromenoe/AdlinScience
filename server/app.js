const express = require('express');
const bodyParser = require("body-parser");
const meetingRoomsRoutes = require('./routes/meetingRooms.js');
const slotsMeetingRoomsRoutes = require('./routes/slotsMeetingRooms.js');



const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', meetingRoomsRoutes);
app.use('/api', slotsMeetingRoomsRoutes);


app.listen(PORT, () => console.log(`Listening on port : ${PORT}`));