const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/meetingRooms', (req, res) => {
	let rawdata = fs.readFileSync(path.join(__dirname, '../salles.json'));
	let student = JSON.parse(rawdata);
	res.json(student);
});

module.exports = router;