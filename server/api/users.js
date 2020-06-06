const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/teachers', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {isTeacher: true}
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
  await User.findByPk(req.params.id)
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
        admin: req.body.admin
      })
    )
    .then(user => res.send(user))
    .catch(next)
})
