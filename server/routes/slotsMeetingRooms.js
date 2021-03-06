const express = require('express');
const router = express.Router();
const slotsMeetingRoomsCtrl = require('../controllers/slotMeetingRooms');
const auth = require('../middleware/auth');

/**
 * expected query : 
 * name (String of the room name)
 */
router.get('/slotsMeetingRooms', auth, slotsMeetingRoomsCtrl.getSlots);


/**
 * Expected body :
 * name (String of the room name)
 * dateStart (timestamp in ms)
 * dateEnd (timestamp in ms)
 */
router.post('/slotsMeetingRooms', auth, slotsMeetingRoomsCtrl.createSlot);

/**
 * Expected body :
 * roomName (String of the room name)
 * slotId (Id of the slot)
 */
 router.delete('/slotsMeetingRooms', auth, slotsMeetingRoomsCtrl.deleteSlot);

module.exports = router;