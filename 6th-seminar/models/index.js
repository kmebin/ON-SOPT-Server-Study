const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.userDB = require('./user')(sequelize, Sequelize);
db.postDB = require('./post')(sequelize, Sequelize);
db.likeDB = require('./like')(sequelize, Sequelize);

db.userDB.hasMany(db.postDB, { onDelete: 'cascade' });
db.postDB.belongsTo(db.userDB);

db.userDB.belongsToMany(db.postDB, { through: 'like', as: 'liked' });
db.postDB.belongsToMany(db.userDB, { through: 'like', as: 'liker' });

module.exports = db;
