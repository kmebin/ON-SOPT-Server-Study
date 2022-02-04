const express = require('express');
const router = express.Router();

router.post('/signup', require('./userSignupPOST'));
router.post('/login', require('./userLoginPOST'));
router.get('/', require('./userAllGET'));
router.get('/:userId', require('./userGET'));
router.put('/:userId', require('./userPUT'));

module.exports = router;
