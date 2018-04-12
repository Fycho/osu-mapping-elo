'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Content', {
    contest_id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(64), allowNull: true, comment: '比赛昵称' },
    create_at: { type: DataTypes.DATE, allowNull: true, defaultValue: new Date, comment: '比赛时间' }
  }, {
      timestamps: false,
      underscored: false,
      // paranoid: true,
      freezeTableName: true,
      tableName: 'contest',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
  });
}
