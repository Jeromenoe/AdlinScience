const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/slotsMeetingRooms', (req, res) => {
	let rawdata = fs.readFileSync(path.join(__dirname, '../resources/slotsMeetingRooms.json'));
	let slots = JSON.parse(rawdata);
	res.json(slots);
});

router.post('/slotsMeetingRooms', (req, res) => {
	let rawdata = fs.readFileSync(path.join(__dirname, '../resources/slotsMeetingRooms.json'));
	let slots = JSON.parse(rawdata);
	res.json(slots);
});

module.exports = router;