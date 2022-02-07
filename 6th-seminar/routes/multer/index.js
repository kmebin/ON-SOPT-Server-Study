const express = require('express');
const router = express.Router();
const { upload }  = require('../../middlewares/uploadImage');

/**
 * @route POST /multer/single
 * @desc 단일 이미지 업로드
 */
router.post('/single', upload.single('image'), async (req, res) => {
  res.send({
    imgaeUrl: req.file.location,
    file: req.file,
    body: req.body,
  });
});
/**
 * @route POST /multer/array
 * @desc 여러 이미지 업로드
 */
router.post('/array', upload.array('image', 3), async (req, res) => {
  res.send({
    imgaeUrl: req.files.map(file => file.location),
    file: req.files,
    body: req.body,
  });
});

module.exports = router;
