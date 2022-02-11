const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * expected query : 
 * name (String of the room name)
 */
router.get('/slotsMeetingRooms', (req, res) => {
	let rawdata = fs.readFileSync(path.join(__dirname, '../resources/slotsMeetingRooms.json'));
	let data = null;
	try {
		data = JSON.parse(rawdata).slots.filter(slot => slot.name.localeCompare(req.query.name) == 0);
	} catch {
		data = {
			slots: []
		}
	}
	res.json(data);
});


/**
 * Expected body :
 * name (String of the room name)
 * dateStart (timestamp in ms)
 * dateEnd (timestamp in ms)
 */
router.post('/slotsMeetingRooms', (req, res) => {
	let rawdata = fs.readFileSync(path.join(__dirname, '../resources/salles.json'));
	let rooms = JSON.parse(rawdata).rooms;
	let currentDate = new Date(new Date().toISOString().split('T')[0]).getTime();
	let timestampMax = currentDate + (1000 * 60 * 60 * 24 * 1000);
	let slot = {
		name: req.body.name,
		dateStart: parseInt(req.body.dateStart),
		dateEnd: parseInt(req.body.dateEnd)
	};
	try {
		for (const [key, value] of Object.entries(slot)) {
			if (value === undefined) {
				throw {
					message: "Wrong inputs"
				}
			}
		}
		if (slot.dateStart < currentDate || slot.dateEnd > timestampMax || slot.dateStart >= slot.dateEnd) {
			throw {
				message: "Wrong dates"
			}
		}

		if (rooms.filter(room => slot.name.localeCompare(room.name) == 0).length > 0) {
			fs.readFile(path.join(__dirname, '../resources/slotsMeetingRooms.json'), function (err, dataFile) {
				try {

					if (err) throw { message: "Couldn't read file"};
					var data = {};
					try {
						data = JSON.parse(dataFile);
					} catch {
						data = {
							slots: []
						}
					}
					data.slots.filter(elem => slot.name.localeCompare(elem.name) == 0)
					.forEach(elem => {
						if ((slot.dateStart >= elem.dateStart && slot.dateStart < elem.dateEnd) ||
							(slot.dateEnd > elem.dateStart && slot.dateEnd <= elem.dateEnd)) {
							throw {
								message: "Already a slot in this period of time"
							}
						}
					})
					data.slots.push(slot);
					fs.writeFile(path.join(__dirname, '../resources/slotsMeetingRooms.json'), JSON.stringify(data), (err) => {
						if (err) throw { message: "Couldn't write on file" };
						res.status(200).json({ message: 'New Data Added' });
					});
				} catch (error) {
					console.log(error);
					res.status(400).json(error);
					return;
				}
			})
		} else {
			throw {
				message: "Can't match room name"
			}
		}
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
});

module.exports = router;