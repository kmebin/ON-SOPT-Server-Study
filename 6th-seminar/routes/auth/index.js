const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/token', authController.createToken);

module.exports = router;
