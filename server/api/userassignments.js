const router = require('express').Router()
const {Userassignment, User, Assignment} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userassignments = await Userassignment.findAll({
      include: [
        {
          model: User
        },
        {
          model: Assignment
        }
      ]
    })
    res.json(userassignments)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  console.log(req.params.id)
  try {
    const userassignments = await Userassignment.findAll({
      where: {userId: req.params.id}
    })
    res.json(userassignments)
  } catch (err) {
    next(err)
  }
})
router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const userassignment = await Userassignment.findByPk(id)
    userassignment.update(req.body)
    res.status(200).send(userassignment)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userassignment = await Userassignment.create(req.body)
    res.status(201).send(userassignment)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const userassignment = await Userassignment.findByPk(id)
    userassignment.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
