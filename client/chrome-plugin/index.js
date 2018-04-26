// google chrome plugin to query elo score of osu! profile
// todo: new site support first, old site later
var oldRegExp = /[osu|old].ppy.sh\/u\/(\w+)/i
var newRegExp = /osu.ppy.sh\/users\/(\w+)/i
var user_id = ''

if (location.href.match(oldRegExp)) {
  // user_id | name
  user_id = location.href.match(oldRegExp)[1]
} else if (location.href.match(newRegExp)) {
  // user_id | name
  user_id = location.href.match(newRegExp)[1]
}

if (user_id) {
  $.ajax({
    url: 'https://elo.milkitic.name/user',
    data: {
      user_id: user_id
    },
    dataType: 'json',
    type: 'get',
    success: function (data) {
      if (data.result === 'success') {
        writeScore(data.user.elo, data.user.ranking)
      } else {
        writeUnranked()
      }
    }
  })
} else {

}

function writeScore (elo, ranking) {
  $('.profile-info__name').eq(0).after('<span>osu!mapping Elo point: ' + elo + '(#' + ranking + ')<span>' )
}

function writeUnranked () {
  $('.profile-info__name').eq(0).after('<span>osu!mapping Elo point: Unranked <span>' )
}