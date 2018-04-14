'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER(11), allowNull: true },
    name: { type: DataTypes.STRING(64), allowNull: true,  unique: true, comment: 'osu!昵称' },
    elo_point: { type: DataTypes.DECIMAL(6, 2), allowNull: false, defaultValue: 1200.00, comment: '当前elo_score' },
    ranking: { type: DataTypes.INTEGER(11) }
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
