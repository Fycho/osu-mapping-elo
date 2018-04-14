'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('UserCheckin', {
    id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER(11),
      field: 'user_id',
      references: {
        model: 'User',
        key: 'user_id'
      },
    },
    contest_id: {
      type: DataTypes.INTEGER(11),
      field: 'contest_id',
      references: {
        model: 'Contest',
        key: 'contest_id'
      },
    },
    score: { type: DataTypes.INTEGER(11), allowNull: false, defaultValue: 0, comment: '比赛得分' }
  },
    {
      underscored: false,
      timestamps: false,
      tableName: 'user_contest',
      comment: '用户登录信息',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      indexes: [{
        name: 'userContest_user_id',
        method: 'BTREE',
        fields: ['user_id']
      }, {
        name: 'userComntest_contest_id',
        method: 'BTREE',
        fields: ['contest_id']
      }]
    });
}

