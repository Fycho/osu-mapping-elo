'use strict';

var sequelize = require('./_db').sequelize();
var User = sequelize.import('./user');
var Contest = sequelize.import('./contest');
var UserContest = sequelize.import('./UserContest');

// 建立模型之间的关系
User.hasMany(UserContest,  { foreignKey: 'user_id', targetKey: 'user_id'})
Contest.hasOne(UserContest,  { foreignKey: 'contest_id', targetKey: 'contest_id'})
// 同步模型到数据库中
sequelize.sync();

exports.User = User;
exports.Contest = Contest;
exports.UserContest = UserContest;
