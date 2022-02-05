const _ = require('lodash');
const { success, fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { userDB, postDB } = require('../models');

module.exports = {
  /**
  * @route POST /post
  * @desc 포스트 작성
  */
  create: async (req, res) => {
    const { userId, title, content } = req.body;
    
    if (!userId || !title || !content) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    
    try {
      const user = await userDB.findOne({ where: { id: userId } });

      if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

      const post = await postDB.create({ userId, title, content });

      res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_POST_SUCCESS, _.pick(post, ['id', 'title', 'content'])));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
    }
  },
};
