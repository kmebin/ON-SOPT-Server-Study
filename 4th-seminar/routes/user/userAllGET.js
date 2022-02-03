const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
const { userDB } = require('../../models');

/**
* @route GET /user
* @desc 모든 유저 조회
*/
module.exports = async (req, res) => {
  try {
    const users = await userDB.findAll({ attributes: ['id', 'email', 'name'] });

    if (!users) return res.status(sc.BAD_REQUEST).send(sc.BAD_REQUEST, rm.NO_USER);
    
    res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_USERS_SUCCESS, users));
  } catch (error) {
    console.log(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.READ_ALL_USERS_FAIL));
  }
};
