const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUser = async (req, res) => {
	let userId = res.locals.user;
	let user = await User.findOne({ _id: userId });
	res.json({name: user.pseudo, role: user.role})
}

const parseConnexion = (req) => {
	if (!req.query.pseudo) {
		throw 'Pseudo must me specified';
	}
	if (req.query.pseudo.length > 10) {
		throw 'Pseudo length must be <= 10'
	}
	if (!req.query.password) {
		throw 'Password must me specified';
	}
	if (req.query.password.length > 10 || req.query.password.length < 5) {
		throw 'Password length must be <= 10 && >= 5'
	}
}

exports.login = async (req, res) => {
	try {
		parseConnexion();
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
		parseConnexion();
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