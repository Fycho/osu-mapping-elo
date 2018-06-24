var calculateElo = require('./core')
var User = require('../model').User
var Contest = require('../model').Contest
var UserContest = require('../model').UserContest
var sequelize = require('../model/_db').sequelize();
var Op = require('sequelize').Op

/**
 * calculate the sum of every elements of the input array
 * @param {array} arguments 
 * @return {array} array of results
 */
const arraySum = (...arguments) => {
  let args = Array.prototype.slice.call(arguments)
  let max = Math.max.call(null, ...args.map(i => i.length))
  let sum = []
  for (let i = 0; i < max; i++) {
    let s = 0
    for (let j = 0; j < args.length; j++) {
      s += args[j][i] || 0
    }
    sum[i] = s
  }
  return sum
}

/**
 * 单次分布计算
 * @param {array} contests 
 * @param {number} i 
 */
const calcuByStep = (contests, i) => {
  console.log(i)
  let k = contests[i].k
  UserContest.findAll({
    attributes: ['contest_id', 'user_id', 'score', 'team'],
    where: {
      contest_id: contests[i].contest_id
    },
    include: [User]
  }).then(uc => {
    // todo: 需支持小组赛
    let users = uc.map(item => item.User.user_id)
    let data = uc.map(item => +item.score)
    let originElo = uc.map(item => +item.User.elo)
    // calculate new elo
    let deltas = calculateElo(data, originElo, k)
    // update user model
    let promises = []
    users.forEach((user_id, index) => {
      let p = User.update({
        elo: originElo[index] + deltas[index]
      }, {
          where: {
            user_id: user_id
          }
        })
      promises.push(p)
    })
    Promise.all(promises).then(() => {
      if (i < contests.length - 1) {
        calcuByStep(contests, ++i)
      } else {
        console.log('Successfully done.')
        process.exit()
      }
    })
  })
}

/**
 * 批量从1200重新计算所有用户elo
 */
const recalculateAll = () => {
  sequelize.query('UPDATE user SET elo=1200').then(rows => {
    Contest.findAll({
      attributes: ['contest_id', 'k', 'sort_order'],
      order: [['sort_order', 'ASC']]
    }).then(contests => {
      calcuByStep(contests, 0)
    })
  })
}

recalculateAll()