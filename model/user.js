'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    user_id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
    name: { type: DataTypes.STRING(64), allowNull: true, comment: 'osu!昵称' },
    elo_score: { type: DataTypes.DECIMAL(6, 2), allowNull: false, defaultValue: 1200.00, comment: '当前elo_score' }
  }, {
      timestamps: false,
      underscored: false,
      // paranoid: true,
      freezeTableName: true,
      tableName: 'user',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
  });
}
