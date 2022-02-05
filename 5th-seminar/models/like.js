const { userDB, postDB } = require('../models');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('like', {
    userId: {
      type: DataTypes.INTEGER,
      reference: {
        model: userDB,
        key: 'id',
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      reference: {
        model: postDB,
        key: 'id',
      }
    },
  }, {
    freezeTableName: true,
  });
};
