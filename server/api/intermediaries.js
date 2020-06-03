const router = require('express').Router()
const {UserCourse} = require('../db/models')
module.exports = router

router.get('/usercourses', async (req, res, next) => {
  await UserCourse.findAll()
    .then(courses => res.send(courses))
    .catch(next)
})
