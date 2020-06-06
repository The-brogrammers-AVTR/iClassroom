const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER, TEXT} = Sequelize

const Lesson = db.define('lesson', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Lesson
