const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER, BOOLEAN, ARRAY, DataTypes, JSON} = Sequelize

const Test = db.define('test', {
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
  test: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
})

module.exports = Test
