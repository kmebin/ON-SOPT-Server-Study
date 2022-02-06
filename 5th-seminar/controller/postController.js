const _ = require('lodash');
const { Op } = require('sequelize');
const { success, fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { userDB, postDB } = require('../models');

module.exports = {
  /**
  * @route POST /post
  * @desc 게시글 작성
  */
  create: async (req, res) => {
    const { userId, title, content } = req.body;
    const imageUrl = req.file.location;
    
    if (!userId || !title || !content) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    
    try {
      const user = await userDB.findOne({ where: { id: userId } });

      if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

      const post = await postDB.create({ userId, title, content, imageUrl });

      res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_POST_SUCCESS, _.pick(post, ['id', 'title', 'content', 'imageUrl'])));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
    }
  },
  /**
  * @route GET /post
  * @desc 모든 게시글 조회
  */
  readAll: async (req, res) => {
    try {
      const posts = await postDB.findAll({
        attributes: ['id', 'title', 'content', 'createdAt'],
        include: [{ 
          model: userDB,
          attributes: ['name'],
        }, {
          model: userDB,
          as: 'liker',
        }],
      });

      if (!posts) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_POST));
      
      const data = posts.map(o => ({
        id: o.dataValues.id,
        title: o.dataValues.title,
        content: o.dataValues.content,
        name: o.dataValues.user.name,
        createdAt: o.dataValues.createdAt,
        likeCount: o.dataValues.liker.length,
      }));

      res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_POSTS_SUCCESS, data));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.READ_ALL_POSTS_FAIL));
    }
  }
};
