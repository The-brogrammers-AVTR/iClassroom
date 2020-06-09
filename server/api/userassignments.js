const router = require('express').Router()
const {Userassignment, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userassignments = await Userassignment.findAll({
      include: [
        {
          model: User
        }
      ]
    })
    res.json(userassignments)
  } catch (err) {
    next(err)
  }
})
