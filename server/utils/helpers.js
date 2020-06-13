const moment = require('moment')
function formatMassege(userName, message) {
  return {
    userName,
    message,
    time: moment().format('hh:mm a')
  }
}

module.exports = formatMassege
