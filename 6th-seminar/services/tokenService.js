const { userDB } = require('../models');
const jwt = require('../lib/jwt');

module.exports = {
  // 토큰 발급
  createToken: async (user) => {
    try {
      const { accessToken } = jwt.sign(user);
      const { refreshToken } = jwt.createRefresh();

      await userDB.update({ refreshToken }, { where: { id: user.id } })

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
};
