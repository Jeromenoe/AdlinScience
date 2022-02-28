const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
	name: {
	  type: String,
	  required: true,
	},
	slots: [{
		userId: {
			type: String,
			required: true
		},
		dateStart: {
			type: Number,
			required: true,
		},
		dateEnd: {
			type: Number,
			required: true,
		},
	}]
});

module.exports = mongoose.model('Room', RoomSchema);