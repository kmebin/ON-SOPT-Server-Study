const { userDB, postDB } = require('../models');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('like', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    freezeTableName: true,
  });
};
