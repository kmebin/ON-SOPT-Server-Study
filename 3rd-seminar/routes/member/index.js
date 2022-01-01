const express = require('express');
const router = express.Router();
const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
let memberDB = require('../../dbMockup/member');

/**
 * @route POST /member
 * @desc 회원 생성
 */
router.post('/', (req, res) => {
  const { name, part, age } = req.body;

  if (!name || !part || !age) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const member = { id: memberDB.length, name, part, age };

  memberDB.push(member);
  res.status(sc.OK).send(success(sc.CREATED, rm.CREATE_MEMBER_SUCCESS, member));
});

/**
 * @route GET /member
 * @desc 모든 회원 조회
 */
router.get('/', (req, res) => {
  res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_MEMBERS_SUCCESS, memberDB));
});

/**
 * @route GET /member/:id
 * @desc 특정 회원 조회
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const member = memberDB.find(member => member.id === +id);

  if (!member) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

  res.status(sc.OK).send(success(sc.OK, rm.READ_MEMBER_SUCCESS, member));
});

/**
 * @route PUT /member/:id
 * @desc 회원 수정
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, part, age } = req.body;

  if (!id || !name || !part || !age) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const memberId = memberDB.findIndex(member => member.id === +id);

  if (memberId === -1) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

  const member = { ...memberDB[memberId], name, part, age };

  memberDB[memberId] = member;
  res.status(sc.OK).send(success(sc.OK, rm.UPDATE_MEMBER_SUCCESS, memberDB));
});

/**
 * @route DELETE /member/:id
 * @desc 회원 삭제
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  const member = memberDB.find(member => member.id === +id);

  if (!member) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

  memberDB = memberDB.filter(member => member.id !== +id);
  res.status(sc.OK).send(success(sc.OK, rm.DELETE_MEMBER_SUCCESS, memberDB));
});

module.exports = router;
