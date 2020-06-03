const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER} = Sequelize

const Course = db.define('course', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1111
  }
})

module.exports = Course
