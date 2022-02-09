const jwt = require('jsonwebtoken');
const { secretKey, options, refreshOptions } = require('../config/secretKey');
const { TOKEN_EXPIRED, TOKEN_INVALID } = require('../constants/jwt');

module.exports = {
  sign: async (user) => {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    const result = {
      token: jwt.sign(payload, secretKey, options),
    };

    return result;
  },
  verify: async (token) => {
    let decoded;

    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }

    return decoded;
  },
  createRefresh: async () => {
    const result = {
      refreshToken: jwt.sign({}, secretKey, refreshOptions),
    };

    return result;
  },
};
