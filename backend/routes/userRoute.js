const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword } = require('../controllers/userController');

// Route to signup a new user
router.post('/signup', signup);

// Route to login user
router.post('/login', login);

// Route to request password reset link
router.post('/forgot-password', forgotPassword);

module.exports = router;
