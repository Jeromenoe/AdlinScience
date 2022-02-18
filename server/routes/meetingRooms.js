const express = require('express');
const router = express.Router();
const meetingRoomsCtrl = require('../controllers/meetingRooms');


router.get('/meetingRooms', meetingRoomsCtrl.getRoom);

module.exports = router;