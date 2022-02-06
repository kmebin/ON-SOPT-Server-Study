const _ = require('lodash');
const { success, fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { likeDB, userDB } = require('../models');

module.exports = {
  /**
  * @route POST /like/:postId
  * @desc 게시글 좋아요 및 취소
  */
  create: async (req, res) => {
    const { userId } = req.body;
    const { postId } = req.params;
    
    if (!userId || !postId) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    
    try {
      const user = await userDB.findOne({ where: { id: userId } });

      if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

      const like = await likeDB.findOne({ where: { userId, postId }});

      if (like) {
        const isLiked = !like.dataValues.isDeleted;

        await likeDB.update({ isDeleted: isLiked }, { where: { userId, postId } });
        
        if (isLiked) return res.status(sc.OK).send(success(sc.OK, rm.DELETE_LIKE_SUCCESS));
        return res.status(sc.OK).send(success(sc.OK, rm.CREATE_LIKE_SUCCESS));
      }

      await likeDB.create({ userId, postId });
      res.status(sc.OK).send(success(sc.OK, rm.CREATE_LIKE_SUCCESS));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
};
