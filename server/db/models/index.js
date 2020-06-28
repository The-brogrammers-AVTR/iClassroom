const db = require('../db')
const User = require('./user')
const Assignment = require('./assignment')
const Course = require('./course')
const Announcement = require('./announcement')
const Lesson = require('./lesson')
const Sequelize = require('sequelize')
const Userassignment = require('./userassignment')
const Test = require('./test')

// blank models
const UserCourse = db.define('UserCourse', {
  admit: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Assignment.hasMany(Test)
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

Course.hasMany(Announcement)
Announcement.belongsTo(Course)

Course.hasMany(Lesson)
Lesson.belongsTo(Course)

module.exports = {
  User,
  Assignment,
  Course,
  UserCourse,
  Announcement,
  Lesson,
  Userassignment,
  Test
}
