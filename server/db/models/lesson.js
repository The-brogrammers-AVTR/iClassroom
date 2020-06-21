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
    type: ARRAY(TEXT),
    defaultValue: [
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    ]
  }
})

module.exports = Lesson
