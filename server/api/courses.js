const router = require('express').Router()
const {Course} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  await Course.findAll()
    .then(courses => res.send(courses))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  await Course.findByPk(req.params.id)
    .then(course => res.send(course))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await Course.create(req.body)
    .then(course => res.send(course))
    .catch(next)
})

router.delete('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id)
    await course.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', (req, res, next) => {
  Course.findByPk(req.params.id)
    .then(course =>
      course.update({
        name: req.body.name
      })
    )
    .then(course => res.send(course))
    .catch(next)
})
