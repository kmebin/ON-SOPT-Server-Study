const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');

router.post('/', postController.create);
router.get('/', postController.readAll);

module.exports = router;
