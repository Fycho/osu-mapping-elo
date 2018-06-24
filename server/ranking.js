/**
 * calculate user elo ranking based on points
 */
var User = require('../model').User
// var p = []
User.findAll({ 
  order: [['elo', 'DESC']]
}).then(users => {
  for (let i = 0; i < users.length; i++) {
    users[i].ranking = i + 1
    users[i].save()
  }
})
