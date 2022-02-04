const { success, fail } = require('../../lib/util');
const sc = require('../../constants/statusCode');
const rm = require('../../constants/responseMessage');
const { userDB } = require('../../models');

/**
* @route PUT /user
* @desc 유저 정보 수정
*/
module.exports = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  
  if (!userId || !name) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  
  try {
    const user = await userDB.update({ name }, {
      where: { id: userId }
    });
    
    if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
    
    res.status(sc.OK).send(success(sc.OK, rm.UPDATE_USER_SUCCESS));
  } catch (error) {
    console.log(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.UPDATE_USER_FAIL));
  }
};
