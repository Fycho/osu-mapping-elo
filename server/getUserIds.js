var User = require('../model').User
var UserContest = require('../model').UserContest
var sequelize = require('../model/_db').sequelize();
var axios = require('axios')

const getUserId = username => {
  console.log(`fetch user data: ${username} \n`)
  axios.get(baseUrl + username).then(({ data }) => {
    if (data.length > 0) {
      if (data[0].username.toLowerCase() === username.toLowerCase()) {
        let user = User.build({
          user_id: data[0].user_id,
          name: data[0].username
        })
        user.save().then(() => {
          console.log(`success: ${username} \n`)
        }).catch(err => {
          console.log('err', err, username)
        })
      } else {
        console.log(`user not match: ${data[0].username}, ${username}, ${data[0].user_id} \n`)
      }
    } else {
      console.log(`user not found: ${username} \n`)
    }
  })
}

sequelize.query('select `value` from `config` where `key` = "apikey"', { raw: true }).then(res => {
  console.log(res)
  const baseUrl = `https://osu.ppy.sh/api/get_user?k=${res[0]}&u=`
  console.log(baseUrl)
  UserContest.findAll({
    where: {
      user_id: null
    }
  }).then(users => {
    console.log(users)
  })
})

// var index = 0
// for (let i in input) {
//   setTimeout(() => {
//     getUserId(i, input[i])
//   }, index * 1500)
//   index++
// }
