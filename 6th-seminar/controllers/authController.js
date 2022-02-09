const _ = require('lodash');
const crypto = require('crypto');
const { success, fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { userDB } = require('../models');

module.exports = {
  /**
  * @route POST /user/signup
  * @desc 회원가입
  */
  signup: async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password ) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    try {
      const alreadyUser = await userDB.findOne({ where: { email } });

      if (alreadyUser) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.ALREADY_EMAIL));

      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await userDB.create({ email, name, password: hashedPassword, salt });

      res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_USER_SUCCESS, _.pick(user, ['id', 'email', 'name'])));
    } catch (error) {
      console.error(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
  /**
  * @route POST /user/login
  * @desc 로그인
  */
  login: async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    try {
      const user = await userDB.findOne({ where: { email } });

      if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

      const { id, name, salt, password: hashedPassword } = user;
      const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

      if (inputPassword !== hashedPassword) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.MISS_MATCH_PW));
      
      res.status(sc.OK).send(success(sc.OK, rm.SIGN_UP_SUCCESS, { id, email, name }));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
};
