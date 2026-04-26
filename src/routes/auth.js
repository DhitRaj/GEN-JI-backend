const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { protect, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/register', protect, requireRole('superadmin'), register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
