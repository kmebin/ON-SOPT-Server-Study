const express = require('express');
const router = express.Router();
const likeController = require('../../controllers/likeController');

router.post('/:postId', likeController.create);

module.exports = router;
