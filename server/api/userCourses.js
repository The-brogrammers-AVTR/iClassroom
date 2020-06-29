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

router.put('/', async (req, res, next) => {
  const courseid = req.body.courseId
  const userid = req.body.userId
  console.log('usercourse put route: ', typeof courseid, typeof userid)

  const userCourseToUpdate = await UserCourse.findOne({
    where: {
      userId: userid,
      courseId: courseid
    }
  })
  userCourseToUpdate.update({admit: req.body.admit})
  res.send(userCourseToUpdate)
})
