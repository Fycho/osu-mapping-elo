var express = require('express');
var router = express.Router();
// 引用模型
var User = require('../model').User;
var UserCheckin = require('../model').UserCheckin;
var UserAddress = require('../model').UserAddress;
var Role = require('../model').Role;

/* User和Role中插入数据 */
router.get('/', function(req, res, next) {
  console.log(req.query.user_id)  
	User.findOne({
    where: {
      user_id: req.query.user_id
    }
  }).then(function(user){
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "X-Requested-With");
    res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.set('Content-Type', 'text/html; charset=utf-8');    
		if (user) {
		  res.end(JSON.stringify({
        result: 'success',
        user: user
      }));
    } else {
      res.end(JSON.stringify({
        result: 'fail',
        message: 'Data Not Found'
      }))
    }
	}).catch(next);
});

/** default */
router.get('*', function(req, res, next) {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end(JSON.stringify({
    result: 'fail',
    message: 'Data Not Found'
  }));
});


module.exports = router;
