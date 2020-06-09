const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/courses', require('./courses'))
router.use('/assignments', require('./assignments'))
router.use('/announcements', require('./announcements'))
router.use('/lessons', require('./lessons'))
router.use('/userassignments', require('./userassignments'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
