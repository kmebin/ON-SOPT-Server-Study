const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
const { userDB } = require('../../models');

/**
* @route DELETE /user/:userId
* @desc 유저 삭제
*/
module.exports = async (req, res) => {
  const { userId } = req.params;
  
  if (!userId) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  
  try {
    const user = await userDB.destroy({ where: { id: userId } });

    console.log(user)
    if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
  
    
    res.status(sc.OK).send(success(sc.OK, rm.DELETE_USER_SUCCESS));
  } catch (error) {
    console.log(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.DELETE_USER_FAIL));
  }
};
