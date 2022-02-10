const _ = require('lodash');
const crypto = require('crypto');
const { success, fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { userService, tokenService } = require('../services');
const jwt = require('../lib/jwt');
const { TOKEN_EXPIRED, TOKEN_INVALID } = require('../constants/jwt');

module.exports = {
  /**
  * @route POST /auth/signup
  * @desc 회원가입
  */
  signup: async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password ) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    try {
      const alreadyUser = await userService.getUserByEmail(email);

      if (alreadyUser) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.ALREADY_EMAIL));

      const user = await userService.createUser(email, name, password);
      const token = await tokenService.createToken(user);

      res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_USER_SUCCESS, _.merge(user, token)));
    } catch (error) {
      console.error(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
  /**
  * @route POST /auth/login
  * @desc 로그인
  */
  login: async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    try {
      const user = await userService.getUserByEmail(email);

      if (!user) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));

      const isMissmatch = userService.checkPassword(user, password);

      if (isMissmatch) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.MISS_MATCH_PW));

      const token = await tokenService.createToken(user);

      res.status(sc.OK).send(success(sc.OK, rm.SIGN_UP_SUCCESS, _.merge(_.pick(user, ['id', 'email', 'name']), token)));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
  /**
  * @route GET /auth/token
  * @desc 토큰 재발급
  */
   createToken: async (req, res) => {
    const { accesstoken, refreshtoken } = req.headers;
  
    if (!accesstoken || !refreshtoken) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    try {
      const token = jwt.verify(accesstoken);

      if (token === TOKEN_INVALID) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
      if (token === TOKEN_EXPIRED) {
        const refreshToken = jwt.verify(refreshtoken);
        
        if (refreshToken === TOKEN_INVALID) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
        if (refreshToken === TOKEN_EXPIRED) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.EXPIRED_ALL_TOKEN));

        const user = await userDB.findOne({
          where: { refreshToken: refreshtoken },
          attributes: [ 'id', 'email', 'name' ],
        });
        const { accessToken } = jwt.sign(user);

        return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_TOKEN, { accessToken }));
      }
      res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.VALID_TOKEN));
    } catch (error) {
      console.log(error);
      res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  },
};
