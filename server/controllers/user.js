const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUser = async (req, res) => {
	let userId = res.locals.user;
	let user = await User.findOne({ _id: userId });
	res.json({name: user.pseudo, role: user.role})
}

exports.login = async (req, res) => {
	try {
		let user = await User.findOne({ pseudo: req.query.pseudo });
		if (!user) {
			throw 'User not found...';
		}
		if (!req.query.password) {
			throw 'Password is required...';
		}
		if (!await user.matchPassword(req.query.password)) {
			throw 'Invalid password...';
		}
		res.status(200).json({
			token: jwt.sign(
				{ userId: user._id },
				'RANDOM_TOKEN_SECRET',
				),
			expiresIn: 7200
		})
	} catch(error) {
		res.status(400).json({ error });
	}
}

exports.signup = async (req, res) => {
	try {
		if (!req.body.password || req.body.password.length < 5)
			throw 'Password is required!';
		const user = new User({
			pseudo: req.body.pseudo,
			password: await bcrypt.hash(req.body.password, 10)
		});
		await user.save();
		res.status(200).json({
			token: jwt.sign(
				{ userId: user._id },
				'RANDOM_TOKEN_SECRET',
				),
			expiresIn: 7200
		})
	} catch (error) {
		res.status(400).json({ error });
	}
}