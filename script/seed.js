'use strict'

const db = require('../server/db')
const {
  User,
  Assignment,
  Course,
  UserCourse,
  Announcement,
  Lesson,
  Userassignment
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
    User.create({
      firstName: 'Aleksandr',
      lastName: 'Kayner',
      email: 'student1@gmail.com',
      password: '123',
      isTeacher: false
    }),
    User.create({
      firstName: 'Vinayak',
      lastName: 'Khare',
      email: 'student2@gmail.com',
      password: '123',
      isTeacher: false
    }),
    User.create({
      firstName: 'Robert',
      lastName: 'Peng',
      email: 'student3@gmail.com',
      password: '123',
      isTeacher: false
    }),
    User.create({
      firstName: 'Mark',
      lastName: 'Bao',
      email: 'student4@gmail.com',
      password: '123',
      isTeacher: false
    }),
    User.create({
      firstName: 'Peet',
      lastName: 'Klecha',
      email: 'student5@gmail.com',
      password: '123',
      isTeacher: false
    })
  ])
  const [tandid, student1, student2, student3, student4, student5] = users

  // courses
  const courses = await Promise.all([
    Course.create({
      name: 'English',
      subject: 'English',
      gradeLevel: 'Elementary'
    }),
    Course.create({name: 'Math', subject: 'Math', gradeLevel: 'Elementary'}),
    Course.create({
      name: 'Science',
      subject: 'Science',
      gradeLevel: 'Elementary'
    }),
    Course.create({
      name: 'American History',
      subject: 'Social Studies',
      gradeLevel: 'Elementary'
    }),
    Course.create({
      name: 'Painting',
      isOpen: false,
      subject: 'Art',
      gradeLevel: 'Elementary'
    }),
    Course.create({
      name: 'Piano',
      isOpen: false,
      subject: 'Music',
      gradeLevel: 'Elementary'
    })
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
    UserCourse.create({userId: student2.id, courseId: math.id}),
    UserCourse.create({userId: student3.id, courseId: science.id}),
    UserCourse.create({userId: student3.id, courseId: math.id}),
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

  const [
    assign1,
    assign2,
    assign3,
    assign4,
    assign5,
    assign6
  ] = await Promise.all([
    Assignment.create({
      title: 'Discover Sun',
      category: 'Astronomy',
      description: 'Read the text and answer the questions.',
      startDate: '2020-06-01',
      endDate: '2020-06-02',
      assignmentURL: null,
      userId: tandid.id,
      courseId: science.id
    }),
    Assignment.create({
      title: 'Discover Moon',
      category: 'Astronomy',
      description: 'Read the text and answer the questions.',
      startDate: '2020-06-05',
      endDate: '2020-06-06',
      assignmentURL: null,
      userId: tandid.id,
      courseId: science.id
    }),
    Assignment.create({
      title: 'Discover Mars',
      category: 'Astronomy',
      description: 'Read the text and answer the questions.',
      startDate: '2020-06-10',
      endDate: '2020-06-11',
      assignmentURL: null,
      userId: tandid.id,
      courseId: science.id
    }),
    Assignment.create({
      title: 'Addition and Subtraction Challenge',
      category: 'Arithmetic',
      description: 'Group math game.',
      startDate: '2020-06-04',
      endDate: '2020-06-05',
      assignmentURL: null,
      userId: tandid.id,
      courseId: math.id
    }),
    Assignment.create({
      title: 'Spelling Bee Challenge',
      category: 'Spelling',
      description: 'Group spelling game.',
      startDate: '2020-06-04',
      endDate: '2020-06-05',
      assignmentURL: null,
      userId: tandid.id,
      courseId: english.id
    }),
    Assignment.create({
      title: 'Collaborative Painting',
      category: 'Drawing',
      description: 'Draw a picture creatively and collaboratively as a team.',
      startDate: '2020-06-02',
      endDate: '2020-06-03',
      assignmentURL: null,
      userId: tandid.id,
      courseId: art.id
    })
  ])

  const userassignment = await Promise.all([
    Userassignment.create({
      userId: student1.id,
      userName: `${student1.firstName} ${student1.lastName}`,
      assignmentId: assign1.id,
      courseId: science.id,
      grade: '90',
      isComplete: true
    }),
    Userassignment.create({
      userId: student1.id,
      userName: `${student1.firstName} ${student1.lastName}`,
      assignmentId: assign2.id,
      courseId: science.id,
      grade: '85',
      isComplete: true
    }),
    Userassignment.create({
      userId: student1.id,
      userName: `${student1.firstName} ${student1.lastName}`,
      assignmentId: assign3.id,
      courseId: science.id,
      grade: null,
      isComplete: false
    }),
    Userassignment.create({
      userId: student1.id,
      userName: `${student1.firstName} ${student1.lastName}`,
      assignmentId: assign4.id,
      courseId: math.id,
      grade: '90',
      isComplete: true
    }),
    Userassignment.create({
      userId: student2.id,
      userName: `${student2.firstName} ${student2.lastName}`,
      assignmentId: assign1.id,
      courseId: science.id,
      grade: '80',
      isComplete: true
    }),
    Userassignment.create({
      userId: student2.id,
      userName: `${student2.firstName} ${student2.lastName}`,
      assignmentId: assign2.id,
      courseId: science.id,
      grade: '75',
      isComplete: true
    }),
    Userassignment.create({
      userId: student2.id,
      userName: `${student2.firstName} ${student2.lastName}`,
      assignmentId: assign3.id,
      courseId: science.id,
      grade: null,
      isComplete: false
    }),
    Userassignment.create({
      userId: student2.id,
      userName: `${student2.firstName} ${student2.lastName}`,
      assignmentId: assign4.id,
      courseId: math.id,
      grade: '75',
      isComplete: true
    }),
    Userassignment.create({
      userId: student3.id,
      userName: `${student3.firstName} ${student3.lastName}`,
      assignmentId: assign1.id,
      courseId: science.id,
      grade: '75',
      isComplete: true
    }),
    Userassignment.create({
      userId: student3.id,
      userName: `${student3.firstName} ${student3.lastName}`,
      assignmentId: assign2.id,
      courseId: science.id,
      grade: '75',
      isComplete: true
    }),
    Userassignment.create({
      userId: student3.id,
      userName: `${student3.firstName} ${student3.lastName}`,
      assignmentId: assign3.id,
      courseId: science.id,
      grade: null,
      isComplete: false
    }),
    Userassignment.create({
      userId: student3.id,
      userName: `${student3.firstName} ${student3.lastName}`,
      assignmentId: assign4.id,
      courseId: math.id,
      grade: '70',
      isComplete: true
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${courses.length} courses`)
  console.log(`seeded ${usercourses.length} userCourses`)
  console.log(`seeded ${announcement.length} announcements`)
  console.log(`seeded ${lesson.length} lessons`)
  console.log(`seeded ${userassignment.length} userassignments`)
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
