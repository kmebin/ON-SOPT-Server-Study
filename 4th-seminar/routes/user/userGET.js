const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
const { userDB } = require('../../models');

/**
* @route GET /user/:userId
* @desc 유저 조회
*/
module.exports = async (req, res) => {
  const { userId } = req.params;
  
  if (!userId) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  
  try {
    const user = await userDB.findOne({
      where: { id: userId },
      attributes: ['id', 'email', 'name'],
    });

    if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
    
    res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, user));
  } catch (error) {
    console.log(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.READ_USER_FAIL));
  }
};
