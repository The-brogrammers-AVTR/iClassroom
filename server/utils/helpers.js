const moment = require('moment')
function formatMassege(userName, message) {
  return {
    userName,
    message,
    time: moment('2020-06-08T16:06:33.666Z', 'YYYY-MM-DDTHH:mm').format(
      'hh:mm a'
    )
  }
}

module.exports = formatMassege
