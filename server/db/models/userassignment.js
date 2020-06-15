const Sequelize = require('sequelize')
const db = require('../db')
const {BOOLEAN, INTEGER, STRING} = Sequelize

const Userassignment = db.define('userassignment', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grade: {
    //type: INTEGER,
    type: STRING,
    allowNull: true
  },
  isComplete: {
    type: BOOLEAN,
    defaultValue: false
  },
  courseId: {
    type: INTEGER,
    allowNull: false
  },
  userId: {
    type: INTEGER,
    allowNull: false
  },
  userName: {
    type: STRING,
    allowNull: false
  },
  assignmentId: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports = Userassignment
