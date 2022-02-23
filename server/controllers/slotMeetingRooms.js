const fs = require('fs');
const path = require('path');
const Room = require('../models/Room');


// Get slots of a particular meeting room
exports.getSlots = async (req, res) => {
	var room = await Room.findOne({ name: req.query.name }).exec();
	let data = [];
	if (room) {
		data = room.slots;
	}
	res.json(data);
}


// Create a new slot for a particular meeting room
exports.createSlot = async (req, res) => {
	let rawdata = fs.readFileSync(path.join(__dirname, '../resources/salles.json'));
	let rooms = JSON.parse(rawdata).rooms;
	let currentDate = new Date(new Date().toISOString().split('T')[0]).getTime() - (1000 * 60 * 60);
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
			var room = await Room.findOne({ name: slot.name }).exec();
			if (room) {
				room.slots.forEach(elem => {
					if ((slot.dateStart >= elem.dateStart && slot.dateStart < elem.dateEnd) ||
						(slot.dateEnd > elem.dateStart && slot.dateEnd <= elem.dateEnd)) {
						throw {
							message: "Already a slot in this period of time"
						}
					}
				})
				room.slots.push({
					userName: 'toto',
					dateStart: slot.dateStart,
					dateEnd: slot.dateEnd
				})
			} else {
				room = new Room({
					name: slot.name,
					slots: [{
						userName: 'toto',
						dateStart: slot.dateStart,
						dateEnd: slot.dateEnd
					}]
				});
			}
			await room.save();
		} else {
			throw {
				message: "Can't match room name"
			}
		}
		res.status(200).json({ message: 'room updated !'});
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}