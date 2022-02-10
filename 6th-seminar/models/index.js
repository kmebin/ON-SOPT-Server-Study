const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const config = require('../config/dbConfig');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

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
