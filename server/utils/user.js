let users = []
function userJoin(id, userName, room) {
  const user = {id, userName, room}
  users.push(user)
  // users.filter(u => {
  //   return u.id != id
  // })
  users = Array.from(new Set(users.map(user => user.id))).map(id => {
    return {
      id: id,
      userName: users.find(u => u.id === id).userName,
      room: users.find(u => u.id === id).room
    }
  })
  return user
}
function getCurrentUser(id) {
  console.log('users from get user', users)
  return users.find(user => user.id === id)
}
function usersForRoom(room) {
  return users.filter(user => {
    return user.room === room
  })
}
function removeUser(id) {
  users = users.filter(user => {
    return user.id !== id
  })
}
module.exports = {
  userJoin,
  getCurrentUser,
  usersForRoom,
  removeUser
}
