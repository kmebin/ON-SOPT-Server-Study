const express = require('express');
const router = express.Router();

router.get('/popular', (req, res) => {
  res.status(200).send('인기 많은 뉴스 랭킹 조회 성공');
});

router.get('/bestreply', (req, res) => {
  res.status(200).send('댓글 많은 뉴스 랭킹 조회 성공');
});

router.get('/age', (req, res) => {
  res.status(200).send('나이 별 뉴스 랭킹 조회 성공');
});

module.exports = router;
