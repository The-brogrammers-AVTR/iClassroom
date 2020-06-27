const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER, DATEONLY} = Sequelize

const Assignment = db.define('assignment', {
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
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  startDate: {
    type: DATEONLY,
    allowNull: true
  },
  endDate: {
    type: DATEONLY,
    allowNull: true
  },
  URL: {
    type: STRING,
    allowNull: true
  },
  userId: {
    type: INTEGER,
    allowNull: false
  },
  testId: {
    type: INTEGER,
    allowNull: true,
    defaultValue: null
  }
})

module.exports = Assignment
