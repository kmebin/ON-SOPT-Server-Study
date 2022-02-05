const { success, fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { likeDB } = require('../models');

module.exports = {
  /**
  * @route POST /like/:postId
  * @desc 게시글 좋아요
  */
  create: async (req, res) => {
    const { userId } = req.body;
    const { postId } = req.params;
    
    if (!userId || !postId) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    
    try {
      const like = await likeDB.create({ userId, postId });
      
      res.status(sc.OK).send(success(sc.OK, rm.CREATE_LIKE_SUCCESS));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_LIKE_FAIL));
    }
  },
};
