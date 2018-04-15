'use strict';

var sequelize = require('./_db').sequelize();
var User = sequelize.import('./user');
var Contest = sequelize.import('./contest');
var UserContest = sequelize.import('./userContest');

// 建立模型之间的关系
User.hasMany(UserContest,  { foreignKey: 'user_id', sourceKey: 'user_id'})
UserContest.belongsTo(User,  { foreignKey: 'user_id', targetKey: 'user_id'})
Contest.hasMany(UserContest,  { foreignKey: 'contest_id', sourceKey: 'contest_id'})
UserContest.belongsTo(Contest,  { foreignKey: 'contest_id', targetKey: 'contest_id'})

// 同步模型到数据库中
sequelize.sync();

exports.User = User;
exports.Contest = Contest;
exports.UserContest = UserContest;
