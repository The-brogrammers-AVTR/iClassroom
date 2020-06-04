'use strict'

const db = require('../server/db')
const {
  User,
  Assignment,
  Course,
  UserCourse,
  Announcement,
  Lesson
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // users
  const users = await Promise.all([
    User.create({
      firstName: 'Tandid',
      lastName: 'Alam',
      email: 'tandid@gmail.com',
      password: '123',
      isTeacher: true
    }),
    User.create({email: 'student1@gmail.com', password: '123'}),
    User.create({email: 'student2@gmail.com', password: '123'}),
    User.create({email: 'student3@gmail.com', password: '123'}),
    User.create({email: 'student4@gmail.com', password: '123'}),
    User.create({email: 'student5@gmail.com', password: '123'})
  ])
  const [tandid, student1, student2, student3, student4, student5] = users

  // courses
  const courses = await Promise.all([
    Course.create({name: 'English'}),
    Course.create({name: 'Math'}),
    Course.create({name: 'Science'}),
    Course.create({name: 'History'}),
    Course.create({name: 'Art'}),
    Course.create({name: 'Music'})
  ])

  const [english, math, science, history, art, music] = courses

  // userCourses
  const usercourses = await Promise.all([
    UserCourse.create({userId: tandid.id, courseId: science.id}),
    UserCourse.create({userId: tandid.id, courseId: math.id}),
    UserCourse.create({userId: tandid.id, courseId: english.id}),
    UserCourse.create({userId: tandid.id, courseId: art.id}),
    UserCourse.create({userId: student1.id, courseId: math.id}),
    UserCourse.create({userId: student1.id, courseId: science.id}),
    UserCourse.create({userId: student2.id, courseId: science.id}),
    UserCourse.create({userId: student3.id, courseId: science.id}),
    UserCourse.create({userId: student4.id, courseId: science.id}),
    UserCourse.create({userId: student5.id, courseId: science.id})
  ])

  // announcement
  const announcement = await Promise.all([
    Announcement.create({
      title: 'No Class',
      description: 'Hi all, there will be no class this Thursday! Thanks.',
      courseId: science.id
    }),
    Announcement.create({
      title: 'Remote Class',
      description:
        'Hi all, due to Corona Virus, all classes will be remote! Thanks.',
      courseId: science.id
    }),
    Announcement.create({
      title: 'No HW this week',
      description: 'There will be no homework for this week. Thanks.',
      courseId: science.id
    }),
    Announcement.create({
      title: 'Test Rescheduled',
      description: 'Hi all, test has been rescheduled for two weeks from now!',
      courseId: science.id
    })
  ])
  // lesson
  const lesson = await Promise.all([
    Lesson.create({
      title: 'Lesson 1',
      description: 'Chapter 1, Powerpoint',
      courseId: science.id
    }),
    Lesson.create({
      title: 'Lesson 2',
      description: 'Chapter 2, Game',
      courseId: science.id
    }),
    Lesson.create({
      title: 'Lesson 3',
      description: 'Chapter 3, Picture book',
      courseId: science.id
    })
  ])

  const [assignment1, assignment2, assignment3] = await Promise.all([
    Assignment.create({
      name: 'Discover Sun',
      category: 'Astronomy',
      description: 'Read the text and answer the questions.',
      assignmentURL: null,
      teacherId: tandid.id,
      courseId: science.id
    }),
    Assignment.create({
      name: 'Discover Moon',
      category: 'Astronomy',
      description: 'Read the text and answer the questions.',
      assignmentURL: null,
      teacherId: tandid.id,
      courseId: science.id
    }),
    Assignment.create({
      name: 'Discover Mars',
      category: 'Astronomy',
      description: 'Read the text and answer the questions.',
      assignmentURL: null,
      teacherId: tandid.id,
      courseId: science.id
    }),
    Assignment.create({
      name: 'Addition and Subtraction Challenge',
      category: 'Arithmetic',
      description: 'Group math game.',
      assignmentURL: null,
      teacherId: tandid.id,
      courseId: math.id
    }),
    Assignment.create({
      name: 'Spelling Bee Challenge',
      category: 'Spelling',
      description: 'Group spelling game.',
      assignmentURL: null,
      teacherId: tandid.id,
      courseId: english.id
    }),
    Assignment.create({
      name: 'Collaborative Painting',
      category: 'Drawing',
      description: 'Draw a picture creatively and collaboratively as a team.',
      assignmentURL: null,
      teacherId: tandid.id,
      courseId: art.id
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${courses.length} courses`)
  console.log(`seeded ${usercourses.length} userCourses`)
  console.log(`seeded ${announcement.length} announcements`)
  console.log(`seeded ${lesson.length} lessons`)
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
