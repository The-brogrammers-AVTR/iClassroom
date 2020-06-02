const router = require('express').Router()
const {Assignment} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll({})
    res.json(assignments)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const assignment = await Assignment.findByPk(id)
    assignment.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
