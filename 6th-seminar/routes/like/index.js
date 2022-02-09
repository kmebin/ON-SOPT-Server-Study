const express = require('express');
const router = express.Router();
const likeController = require('../../controllers/likeController');
const { auth }  = require('../../middlewares/auth');

router.post('/:postId', auth, likeController.create);

module.exports = router;
