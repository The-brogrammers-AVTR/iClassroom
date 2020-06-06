const router = require('express').Router()
const {Lesson} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  await Lesson.findAll()
    .then(lessons => res.send(lessons))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await Lesson.create(req.body)
    .then(lesson => res.send(lesson))
    .catch(next)
})

router.delete('/:id', async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id)
    await lesson.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', (req, res, next) => {
  Lesson.findByPk(req.params.id)
    .then(lesson =>
      lesson.update({
        name: req.body.name
      })
    )
    .then(lesson => res.send(lesson))
    .catch(next)
})
