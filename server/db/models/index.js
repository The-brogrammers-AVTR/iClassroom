const db = require('../db')
const User = require('./user')
const Assignment = require('./assignment')
const Course = require('./course')
const Announcement = require('./announcement')
const Lesson = require('./lesson')
const Image = require('./image')
const Sequelize = require('sequelize')
const Userassignment = require('./userassignment')

// blank models
const UserCourse = db.define('UserCourse')
// const Userassignment = db.define('Userassignment', {
//   grade: {
//     type: Sequelize.INTEGER,
//     defaultValue: 80
//   },
//   isComplete: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false
//   }
// })

User.hasMany(UserCourse)
UserCourse.belongsTo(User)

User.belongsToMany(Course, {through: UserCourse})
Course.belongsToMany(User, {through: UserCourse})

Course.hasMany(UserCourse)
UserCourse.belongsTo(Course)

Course.hasMany(Assignment)
Assignment.belongsTo(Course)

User.hasMany(Assignment)
Assignment.belongsTo(User)
User.hasMany(Userassignment)
Userassignment.belongsTo(User)
Userassignment.belongsTo(Assignment)

//Assignment.belongsToMany(User)
//Assignment.belongsToMany(User, {through: UserAssignment})
//User.belongsToMany(Assignment, {through: UserAssignment})

Course.hasMany(Announcement)
Announcement.belongsTo(Course)

Course.hasMany(Lesson)
Lesson.belongsTo(Course)

module.exports = {
  User,
  Assignment,
  Image,
  Course,
  UserCourse,
  Announcement,
  Lesson,
  Userassignment
}
