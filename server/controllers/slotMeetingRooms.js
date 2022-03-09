const fs = require('fs');
const path = require('path');
const Room = require('../models/Room');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { parse } = require('path');

const parseGetSlots = (req) => {
	if (!req.query.name) {
		throw { message: 'Room name must be specified' };
	}
}

// Get slots of a particular meeting room
exports.getSlots = async (req, res) => {
	try {
		parseGetSlots(req);
		var room = await Room.findOne({ name: req.query.name }).exec();
		let slots = [];
		if (!room) {
			res.status(200).json(slots);
			return ;
		}
		slots = room.slots;
		let userId = res.locals.user;
		slots = slots.map((slot) => {
			let newSlot = { ...slot._doc, owned: (userId.localeCompare(slot.userId) == 0) ? true : false };
			return newSlot;
		});
		res.status(200).json(slots);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}

const parseCreateSlot = (req) => {
	if (!req.body.name) {
		throw { message: 'Room name must be specified' };
	}
	if (!req.body.dateStart) {
		throw { message: 'dateStart must be specified' };
	}
	if (!req.body.dateEnd) {
		throw { message: 'dateEnd must be specified' };
	}
}

// Create a new slot for a particular meeting room
exports.createSlot = async (req, res) => {
	try {
		parseCreateSlot(req);
		let rawdata = fs.readFileSync(path.join(__dirname, '../resources/salles.json'));
		let rooms = JSON.parse(rawdata).rooms;
		let currentDate = new Date(new Date().toISOString().split('T')[0]).getTime() - (1000 * 60 * 60);
		let timestampMax = currentDate + (1000 * 60 * 60 * 24 * 1000);
		let slot = {
			name: req.body.name,
			dateStart: parseInt(req.body.dateStart),
			dateEnd: parseInt(req.body.dateEnd)
		};
		for (const [key, value] of Object.entries(slot)) {
			if (value === undefined) {
				throw {
					message: "Wrong inputs"
				}
			}
		}
		if (slot.dateStart < currentDate ||
			slot.dateEnd > timestampMax ||
			slot.dateStart >= slot.dateEnd) {
			throw {
				message: "Wrong dates"
			}
		}

		if (rooms.filter(room => slot.name.localeCompare(room.name) == 0).length > 0) {
			var room = await Room.findOne({ name: slot.name }).exec();
			if (room) {
				room.slots.forEach(elem => {
					if ((slot.dateStart >= elem.dateStart && slot.dateStart < elem.dateEnd) ||
						(slot.dateEnd > elem.dateStart && slot.dateEnd <= elem.dateEnd) ||
						(slot.dateStart < elem.dateStart && slot.dateEnd > elem.dateEnd)) {
						throw {
							message: "Already a slot in this period of time"
						}
					}
				})
				room.slots.push({
					userId: res.locals.user,
					dateStart: slot.dateStart,
					dateEnd: slot.dateEnd
				})
			} else {
				room = new Room({
					name: slot.name,
					slots: [{
						userId: res.locals.user,
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
		res.status(200).json({ message: 'room updated !' });
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}

const parseDeleteSlot = (req) => {
	if (!req.body.roomName) {
		throw { message: 'Room name must be specified' };
	}
	if (!req.body.slotId) {
		throw { message: 'Slot id must be specified' };
	}
}

// Get slots of a particular meeting room
exports.deleteSlot = async (req, res) => {
	try {
		parseDeleteSlot(req);
		var room = await Room.findOne({ name: req.body.roomName }).exec();
		let slots = [];
		if (!room) {
			throw { message: 'Room not found' };
		}
		slots = room.slots;
		let slot = slots.filter((slot) => {
			return slot._id.toString().localeCompare(req.body.slotId) == 0
		})
		let userId = res.locals.user;
		let user = await User.findOne({ _id: userId });
		if (slot.length > 0 && (!slot[0].userId.toString().localeCompare(res.locals.user) || !user.role.localeCompare('admin'))) {
			for (var i = 0; i < slots.length; i++) {
				if (slots[i]._id.toString().localeCompare(req.body.slotId) == 0) {
					slots.splice(i, 1);
				}
			}
		}
		await room.save();
		res.status(200).json(slots);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}