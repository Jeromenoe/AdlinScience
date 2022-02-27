const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	pseudo: { type: String, required: true, unique: true},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	password: { type: String, required: true},
});


// Sign JWT and return
// UserSchema.methods.getSignedJwtToken = function() {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE
//   });
// };

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);