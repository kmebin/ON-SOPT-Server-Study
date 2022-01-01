const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/ranking', require('./ranking'));
router.use('/society', require('./society'));
router.use('/member', require('./member'));

module.exports = router;
