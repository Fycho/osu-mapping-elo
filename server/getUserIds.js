var User = require('../model').User
var input = require('../data/user2.json')
var axios = require('axios')

const apiKey = ''
const baseUrl = `https://osu.ppy.sh/api/get_user?k=${apiKey}&u=`

const getUserId = (username, id) => {
  console.log(`fetch user data: ${username}, ${id} \n`)
  axios.get(baseUrl + username).then(({data}) => {
    if (data.length > 0) {
      if (data[0].username.toLowercase() === username.toLowercase()) {
        if (id && data[0].user_id != id) {
          console.log(`id not match: ${data[0].user_id}, ${id} \n`)
        }
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

var index = 0
for (let i in input) {
  setTimeout(() => {
    getUserId(i, input[i])
  }, index * 1500)
  index++
}