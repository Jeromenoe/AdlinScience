const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const auth = require('../middleware/auth');


router.get('/user', auth, user.getUser);
router.get('/login', user.login);
router.post('/signup', user.signup);

module.exports = router;