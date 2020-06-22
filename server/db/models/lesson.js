const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER, TEXT, ARRAY} = Sequelize

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
  },

  documents: {
    type: ARRAY(Sequelize.JSON),
    defaultValue: []
  }
})

module.exports = Lesson
