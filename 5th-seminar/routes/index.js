const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/like', require('./like'));
router.use('/multer', require('./multer'));

module.exports = router;
