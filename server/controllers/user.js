const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUser = async (req, res) => {
	let userId = res.locals.user;
	let user = await User.findOne({ _id: userId });
	res.json({name: user.pseudo, role: user.role})
}

const parseLogin = (req) => {
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
		parseLogin(req);
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
				process.env.TOKEN_KEY,
				),
			expiresIn: 7200
		})
	} catch(error) {
		res.status(400).json({ error });
	}
}

const parseSignup = (req) => {
	if (!req.body.pseudo) {
		throw 'Pseudo must me specified';
	}
	if (req.body.pseudo.length > 10) {
		throw 'Pseudo length must be <= 10'
	}
	if (!req.body.password) {
		throw 'Password must me specified';
	}
	if (req.body.password.length > 10 || req.body.password.length < 5) {
		throw 'Password length must be <= 10 && >= 5'
	}
}

exports.signup = async (req, res) => {
	try {
		parseSignup(req);
		const user = new User({
			pseudo: req.body.pseudo,
			password: await bcrypt.hash(req.body.password, 10)
		});
		await user.save();
		res.status(200).json({
			token: jwt.sign(
				{ userId: user._id },
				process.env.TOKEN_KEY,
				),
			expiresIn: 7200
		})
	} catch (error) {
		res.status(400).json({ error });
	}
}