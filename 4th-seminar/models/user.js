module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    freezeTabName: true,
    underscored: true,
  });
};
