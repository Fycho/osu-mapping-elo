'use strict';

var Sequelize = require('sequelize');

exports.sequelize = function () {
  return new Sequelize(
    'mapping_elo',
    'root',
    'root', 
    { host: '127.0.0.1', port: 3306, logging: () => {}, dialect: 'mysql' }
  );
}
