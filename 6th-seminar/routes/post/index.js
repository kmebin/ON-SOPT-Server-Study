const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');
const { upload }  = require('../../middlewares/uploadImage');
const { auth }  = require('../../middlewares/auth');

router.post('/', auth, upload.single('image'), postController.create);
router.get('/', postController.readAll);

module.exports = router;
