var express = require('express');
var router = express.Router();
var User = require('../model').User;
var Op = require('sequelize').Op

/**
 * restful api
 * 查询User数据
 */
router.get('/user', function (req, res, next) {
  if (!req.query.user_id || req.query.user_id <= 0) {
    res.end(JSON.stringify({
      result: 'fail',
      message: 'Unranked'
    }))
    return
  }
  User.findOne({
    where: {
      user_id: {
        [Op.eq]: req.query.user_id
      }
    }
  }).then(user => {
    res.set('Access-Control-Allow-Headers', 'X-Requested-With');
    res.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.set('Content-Type', 'text/html; charset=utf-8');
    if (user) {
      res.end(JSON.stringify({
        result: 'success',
        user: user
      }));
    } else {
      res.end(JSON.stringify({
        result: 'fail',
        message: 'Unranked'
      }))
    }
  }).catch(next);
});

/** default */
router.get('*', function (req, res, next) {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end(JSON.stringify({
    result: 'error',
    message: '404 Not Found'
  }));
});


module.exports = router;
