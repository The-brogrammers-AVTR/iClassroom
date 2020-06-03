'use strict'

const db = require('../server/db')
const {
  User,
  Teacher,
  Assignment,
  Course,
  UserCourse
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Tandid',
      lastName: 'Alam',
      email: 'tandid@gmail.com',
      password: '123',
      isTeacher: true
    }),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const [tandid, murphy] = users

  const courses = await Promise.all([
    Course.create({name: 'English'}),
    Course.create({name: 'Math'}),
    Course.create({name: 'Science'}),
    Course.create({name: 'History'}),
    Course.create({name: 'Art'}),
    Course.create({name: 'Music'})
  ])

  const [english, math, science, history, art, music] = courses

  const usercourses = await Promise.all([
    UserCourse.create({userId: tandid.id, courseId: science.id}),
    UserCourse.create({userId: tandid.id, courseId: math.id}),
    UserCourse.create({userId: tandid.id, courseId: english.id}),
    UserCourse.create({userId: tandid.id, courseId: art.id}),
    UserCourse.create({userId: murphy.id, courseId: math.id}),
    UserCourse.create({userId: murphy.id, courseId: science.id})
  ])

  const [teacher1] = await Promise.all([Teacher.create({name: 'Isaac Newton'})])

  const [assignment1, assignment2, assignment3] = await Promise.all([
    Assignment.create({
      name: 'Discover Sun',
      category: 'Science',
      description: 'Read the text and answer the questions.',
      assignmentURL: null,
      teacherId: teacher1.id
    }),
    Assignment.create({
      name: 'Discover Moon',
      category: 'Science',
      description: 'Read the text and answer the questions.',
      assignmentURL: null,
      teacherId: teacher1.id
    }),
    Assignment.create({
      name: 'Discover Mars',
      category: 'Science',
      description: 'Read the text and answer the questions.',
      assignmentURL: null,
      teacherId: teacher1.id
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${courses.length} courses`)
  console.log(`seeded ${usercourses.length} userCourses`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
