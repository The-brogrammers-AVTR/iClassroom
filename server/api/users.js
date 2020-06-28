const router = require('express').Router()
const {User, Assignment, Userassignment, UserCourse} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        UserCourse,
        {
          model: Assignment
        },
        {
          model: Userassignment
        }
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/teachers', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {isTeacher: true},
      include: [UserCourse]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/students', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {isTeacher: false}
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  await User.findByPk(req.params.id, {
    include: [
      UserCourse,
      {
        model: Assignment
      },
      {
        model: Userassignment
      }
    ]
  })
    .then(user => res.send(user))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user =>
      user.update({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imageURL: req.body.imageURL,
        isTeacher: req.body.isTeacher
      })
    )
    .then(user => res.send(user))
    .catch(next)
})
