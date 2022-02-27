
exports.login = (req, res) => {
	console.log(req.query);
	res.status(200).json({
		pseudo: 'req.query.pseudo',
		password: 'mypass',
		token: 'ahaha',
		expiresIn: 10,
	})
}