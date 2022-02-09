const { success, fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { userDB, postDB } = require('../models');

module.exports = {
  /**
  * @route GET /user/all
  * @desc 모든 유저 조회
  */
  readAll: async (req, res) => {
    try {
      const users = await userDB.findAll({ attributes: ['id', 'email', 'name'] });
  
      if (!users) return res.status(sc.BAD_REQUEST).send(sc.BAD_REQUEST, rm.NO_USER);
      
      res.status(sc.OK).send(success(sc.OK, rm.READ_ALL_USERS_SUCCESS, users));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
  /**
  * @route GET /user
  * @desc 유저 정보 조회
  */
  read: async (req, res) => {
    const userId = req.user.id;
        
    try {
      const user = await userDB.findOne({
        where: { id: userId },
        attributes: ['id', 'email', 'name'],
        include: [{
          model: postDB,
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        }]
      });

      if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
      
      res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, user));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
  /**
  * @route PUT /user
  * @desc 유저 수정
  */
  update: async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    
    if (!name) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    
    try {
      const user = await userDB.update({ name }, {
        where: { id: userId }
      });
      
      if (user[0] === 0) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
      
      res.status(sc.OK).send(success(sc.OK, rm.UPDATE_USER_SUCCESS));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
  /**
  * @route DELETE /user
  * @desc 유저 삭제
  */
  delete: async (req, res) => {
    const userId = req.user.id;
      
    try {
      const user = await userDB.destroy({ where: { id: userId } });

      if (user === 0) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
    
      res.status(sc.OK).send(success(sc.OK, rm.DELETE_USER_SUCCESS));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
};
