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
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000?user_id=' + user_id, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (xhr.responseText.result === 'success') {
        writeScore(xhr.responseText.user.elo_score)
      } else {
        // todo: unranked & inactive conditions
        writeScore(1200)
      }
    }
  }
  xhr.send()
} else {

}

function writeScore (score) {
  $('.profile-info__name').eq(0).after('<span>osu!mapping ELO point: ' + score + '<span>' )
}