const fs = require('fs');
const path = require('path');

exports.getRoom = (req, res) => {
	let rawdata = fs.readFileSync(path.join(__dirname, '../resources/salles.json'));
	let rooms = JSON.parse(rawdata);
	res.json(rooms);
}