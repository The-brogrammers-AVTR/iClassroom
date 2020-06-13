const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER, DATEONLY} = Sequelize

const Assignment = db.define('assignment', {
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
  category: {
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
  dueDate: {
    type: DATEONLY,
    allowNull: true
  },
  assignmentURL: {
    type: STRING,
    allowNull: true
  },
  userId: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports = Assignment
