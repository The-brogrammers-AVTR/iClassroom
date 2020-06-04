const router = require('express').Router()
const {Announcement} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  await Announcement.findAll()
    .then(announcements => res.send(announcements))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await Announcement.create(req.body)
    .then(announcement => res.send(announcement))
    .catch(next)
})

router.delete('/:id', async (req, res, next) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id)
    await announcement.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', (req, res, next) => {
  Announcement.findByPk(req.params.id)
    .then(announcement =>
      announcement.update({
        name: req.body.name
      })
    )
    .then(announcement => res.send(announcement))
    .catch(next)
})
