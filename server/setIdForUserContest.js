// set userids in user_contest when datas are imported (should be called after server/getUserIds)
var UserContest = require('../model').UserContest
var User = require('../model').User

UserContest.findAll({
  where: {
    user_id: null
  }
}).then(uc => {
  uc.forEach(item => {
    User.findOne({
      where: {
        name: item.name
      }
    }).then(user => {
      if (user) {
        item.update({
          user_id: user.user_id
        })
      }
    })
  })
})