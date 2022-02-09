const jwt = require('../lib/jwt');
const { fail } = require('../lib/util');
const sc = require('../constants/statusCode');
const rm = require('../constants/responseMessage');
const { TOKEN_EXPIRED, TOKEN_INVALID } = require('../constants/jwt');
const { userDB } = require('../models');

const auth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));

  try {
    const decoded = jwt.verify(token);

    if (decoded === TOKEN_EXPIRED) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
    if (decoded === TOKEN_INVALID) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));

    const userId = decoded.id;

    if (!userId) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));

    const user = await userDB.findOne({ where: { id: userId } });

    if (!user) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.NO_USER));

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { auth };
