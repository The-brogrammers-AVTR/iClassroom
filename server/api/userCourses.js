const router = require('express').Router()
const {Course, UserCourse} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  await UserCourse.findAll()
    .then(courses => res.send(courses))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await UserCourse.create(req.body)
    .then(course => res.send(course))
    .catch(next)
})
