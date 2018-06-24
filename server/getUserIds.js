 // get the user_id of whom aren't in user table, and create users
var User = require('../model').User
var UserContest = require('../model').UserContest
var sequelize = require('../model/_db').sequelize();
var axios = require('axios')

const getUserId = (baseUrl, username) => {
  console.log(`fetch user data: ${baseUrl + username} \n`)
  axios.get(baseUrl + username).then(({ data }) => {
    if (data.length > 0) {
      if (data[0].username.toLowerCase() === username.toLowerCase()) {
        User.findOne({
          where: {
            user_id: data[0].user_id
          }
        }).then(user => {
          console.log(user)
          if (!user) {
            let user = User.build({
              user_id: data[0].user_id,
              name: data[0].username
            })
            user.save().then(() => {
              console.log(`success: ${username} \n`)
            }).catch(err => {
              console.log('err', err, username)
            })
          }
        })
      } else {
        console.log(`user not match: ${data[0].username}, ${username}, ${data[0].user_id} \n`)
      }
    } else {
      console.log(`user not found: ${username} \n`)
    }
  })
}

var index = 0
sequelize.query('select `value` from `config` where `key` = "apikey"', { raw: true }).then(res => {
  const baseUrl = `https://osu.ppy.sh/api/get_user?k=${res[0][0].value}&u=`
  UserContest.findAll({
    where: {
      user_id: null
    }
  }).then(uc => {
    uc.forEach(item => {
      setTimeout(() => {
        getUserId(baseUrl, item.name)
      }, index * 1500)
      index++
    })
  })
})

