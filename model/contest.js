'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Content', {
    contest_id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(64), allowNull: true, comment: 'contest title' },
    song: { type: DataTypes.STRING(128), allowNull: true, comment: 'song name' },
    k: { type: DataTypes.INTEGER, allowNull: false, comment: '常数K' },
    create_at: { type: DataTypes.DATE, allowNull: true, comment: '比赛结果发布时间' },
    sort_order: { type: DataTypes.INTEGER(4), allowNull: false, comment: '排序' }
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
