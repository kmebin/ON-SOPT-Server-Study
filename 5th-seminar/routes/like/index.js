const express = require('express');
const router = express.Router();
const likeController = require('../../controller/likeController');

router.post('/:postId', likeController.create);

module.exports = router;
