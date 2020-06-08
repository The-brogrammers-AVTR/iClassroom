const formatMessage = require('../utils/helpers')
const {
  userJoin,
  getCurrentUser,
  usersForRoom,
  removeUser
} = require('../utils/user')

module.exports = io => {
  const name = 'alex'
  io.on('connection', socket => {
    socket.on('joinRoom', ({userName, room}) => {
      const user = userJoin(socket.id, userName, room)
      socket.join(user.room)

      socket.broadcast
        .to(user.room)
        .emit('message', formatMessage(userName, 'welcome'))
    })
    socket.emit('message', formatMessage(name, 'welcome'))
    socket.on('chat message', msg => {
      console.log('cirle', msg)
      const user = getCurrentUser(socket.id)
      io.to(user.room).emit('message', formatMessage(user.userName, msg))
      socket.on('getUsers', msg => {
        const user = getCurrentUser(socket.id)
        let roomUsers = usersForRoom(msg.room)
        io.to(msg.room).emit('getUsers', roomUsers)
      })
    })
    socket.on('circle', circle => {
      console.log('cirle', circle)
      io.emit('circle', circle)
    })
    socket.on('rectangles', rectangles => {
      //console.log('rectangles', rectangles)
      io.emit('rectangles', rectangles)
    })
    socket.on('images', images => {
      //console.log('images', images)
      io.emit('images', images)
    })
    // socket.on('getUsers', msg => {
    //   const user = getCurrentUser(socket.id)
    //   let roomUsers = usersForRoom(msg.room)
    //   io.to(msg.room).emit('getUsers', roomUsers)
    // })

    socket.on('disconnect', () => {
      let removedUser = removeUser(socket.id)
      io.emit('message', formatMessage(name, `user disconected ${name}`))
    })
  })
  // io.on('connection', socket => {
  //   socket.on('chat message', msg => {
  //     console.log('message: ' + msg)
  //     io.emit('chat message', msg)
  //   })
  // })
  //setInterval(() => io.emit('time', new Date().toTimeString()), 1000)
}
