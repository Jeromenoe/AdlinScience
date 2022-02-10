const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/slotsMeetingRooms', (req, res) => {
	console.log("test")
	let rawdata = fs.readFileSync(path.join(__dirname, '../slotsMeetingRooms.json'));
	let slots = JSON.parse(rawdata);
	res.json(slots);
});

module.exports = router;