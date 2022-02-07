module.exports = (sequelize, DataTypes) => {
  return sequelize.define('post', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    freezeTableName: true,
  });
};
