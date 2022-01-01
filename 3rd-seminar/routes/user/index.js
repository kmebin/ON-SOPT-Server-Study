const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('유저 조회 성공');
});

module.exports = router;
