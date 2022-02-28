const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		if (!req.headers.authorization)
			throw 'Token must be specified!';
		const token = req.headers.authorization;
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		res.locals.user = decodedToken.userId;
		next();
	} catch (error) {
		console.log(error)
		res.status(401).json({ error })
	}
}	