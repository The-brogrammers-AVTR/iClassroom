const router = require('express').Router()
const {Test} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  let a = await Test.findAll()
    .then(test => res.send(test))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  console.log(req.body.test)
  await Test.create(req.body)
    .then(test => res.send(test))
    .catch(next)
})

router.delete('/:id', async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.id)
    console.log(test)
    await test.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// router.put('/:id', (req, res, next) => {
//   Lesson.findByPk(req.params.id)
//     .then(lesson =>
//       lesson.update({
//         name: req.body.name
//       })
//     )
//     .then(lesson => res.send(lesson))
//     .catch(next)
// })
