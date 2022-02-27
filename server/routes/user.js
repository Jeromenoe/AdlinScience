const express = require('express');
const router = express.Router();
const user = require('../controllers/user');


router.get('/login', user.login);
router.post('/signup', user.signup);

module.exports = router;