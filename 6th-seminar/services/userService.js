const _ = require('lodash');
const crypto = require('crypto');
const { userDB } = require('../models');

module.exports = {
  // 유저 생성
  createUser: async (email, name, password) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await userDB.create({ email, name, password: hashedPassword, salt });

      return _.pick(user, ['id', 'email', 'name']);
    } catch (error) {
      throw error;
    }
  },
  // 이메일로 유저 조회
  getUserByEmail: async (email) => {
    try {
      const user = userDB.findOne({ where: { email } });

      return user;
    } catch (error) {
      throw error;
    }
  },
  // 비밀번호 일치 여부 체크
  checkPassword: (user, password) => {
    const { password: hashedPassword, salt } = user;
    const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    const isMissmatch = inputPassword !== hashedPassword;

    return isMissmatch;
  },
};
