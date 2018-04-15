'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('UserContest', {
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
    name: { type: DataTypes.STRING(128), allowNull: true },
    team: { type: DataTypes.INTEGER(11), defaultValue: 0, allowNull: false },    
    score: { type: DataTypes.DECIMAL(8, 4), allowNull: false, defaultValue: 0, comment: '比赛得分' }
  },
    {
      underscored: false,
      timestamps: false,
      tableName: 'user_contest',
      comment: '',
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

