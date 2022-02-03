const crypto = require('crypto');
const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
const { userDB } = require('../../models');

/**
 * @route POST /user/signup
 * @desc 회원가입
 */
module.exports = async(req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password ) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  try {
    const alreadyUser = await userDB.findOne({ where: { email } });

    if (alreadyUser) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.ALREADY_EMAIL));

    const salt = crypto.randomBytes(64).toString('base64');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    const user = await userDB.create({ email, name, password: hashedPassword, salt });

    res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGN_UP_SUCCESS, { id: user.id, email, name }));
  } catch (error) {
    console.error(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.SIGN_UP_FAIL));
  }
};
