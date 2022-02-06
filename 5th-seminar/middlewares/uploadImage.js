const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const dayjs = require('dayjs');

aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'sopt-27-server',
    acl: 'public-read',
    key: function(req, file, cb) {
      const extension = file.originalname.split('.').pop();
      const format = `${dayjs().format('YYYYMMDD_HHmmss_')}${Math.round(Math.random() * 1000000000000).toString()}`;

      cb(null, format + '.' + extension);
    }
  })
});

module.exports = { upload };
