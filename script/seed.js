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
      name: 'Javascript',
      subject: 'Math',
      gradeLevel: 'Elementary'
    }),
    Course.create({
      name: 'American History',
      subject: 'Social Studies',
      gradeLevel: 'Elementary'
    }),
    Course.create({
      name: 'Painting',
      // isOpen: false,
      subject: 'Art',
      gradeLevel: 'Elementary'
    }),
    Course.create({
      name: 'Piano',
      // isOpen: false,
      subject: 'Music',
      gradeLevel: 'Elementary'
    })
  ])

  const [english, math, java, history, art, music] = courses

  // userCourses
  const usercourses = await Promise.all([
    UserCourse.create({userId: tandid.id, courseId: java.id}),
    UserCourse.create({userId: tandid.id, courseId: math.id}),
    UserCourse.create({userId: tandid.id, courseId: english.id}),
    UserCourse.create({userId: tandid.id, courseId: art.id}),
    UserCourse.create({userId: student1.id, courseId: math.id}),
    UserCourse.create({userId: student1.id, courseId: java.id}),
    UserCourse.create({userId: student2.id, courseId: java.id}),
    UserCourse.create({userId: student2.id, courseId: math.id}),
    UserCourse.create({userId: student3.id, courseId: java.id}),
    UserCourse.create({userId: student3.id, courseId: math.id}),
    UserCourse.create({userId: student4.id, courseId: java.id}),
    UserCourse.create({userId: student5.id, courseId: java.id})
  ])

  // announcement
  const announcement = await Promise.all([
    Announcement.create({
      title: 'No Class',
      description: 'Hi all, there will be no class this Thursday! Thanks.',
      courseId: java.id
    }),
    Announcement.create({
      title: 'Remote Class',
      description:
        'Hi all, due to Corona Virus, all classes will be remote! Thanks.',
      courseId: java.id
    }),
    Announcement.create({
      title: 'No HW this week',
      description: 'There will be no homework for this week. Thanks.',
      courseId: java.id
    }),
    Announcement.create({
      title: 'Test Rescheduled',
      description: 'Hi all, test has been rescheduled for two weeks from now!',
      courseId: java.id
    })
  ])
  // lesson
  const lesson = await Promise.all([
    Lesson.create({
      title: 'Lesson 1: What is Javascript',
      description:
        'Learn why people use Javascript and how it compares to other languages.',
      courseId: java.id
    }),
    Lesson.create({
      title: 'Lesson 2: Variables & Data Types',
      description:
        'Learn about what variables are and the many data types that are used such as strings, integers, objects, etc.',
      courseId: java.id
    }),
    Lesson.create({
      title: 'Lesson 3: Functions',
      description: 'Learn about the basics of functional programming. ',
      courseId: java.id
    }),
    Lesson.create({
      title: 'Lesson 4: Loops',
      description: 'Learn about the different types of looping',
      courseId: java.id
    }),
    Lesson.create({
      title: 'Lesson 5: Debugging',
      description: 'Learn how we debug our code.',
      courseId: java.id
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
      title: 'Why Javascript?',
      description:
        'In your own words, write a paragraph on why Javascript is an important language to learn.',
      startDate: '2020-06-01',
      endDate: '2020-06-02',
      assignmentURL: null,
      userId: tandid.id,
      courseId: java.id
    }),
    Assignment.create({
      title: 'Variables and Data Types: Practice Problems',
      description: 'Answer the questions in the following link.',
      startDate: '2020-06-01',
      endDate: '2020-06-02',
      assignmentURL: null,
      userId: tandid.id,
      courseId: java.id
    }),
    Assignment.create({
      title: 'Functions: Practice Problems',
      description: 'Answer the questions in the following link.',
      startDate: '2020-06-05',
      endDate: '2020-06-06',
      assignmentURL: null,
      userId: tandid.id,
      courseId: java.id
    }),
    Assignment.create({
      title: 'Loops: Practice Problems',
      description: 'Answer the questions in the following link.',
      startDate: '2020-06-10',
      endDate: '2020-06-11',
      assignmentURL: null,
      userId: tandid.id,
      courseId: java.id
    }),
    Assignment.create({
      title: 'Addition and Subtraction Challenge',
      description: 'Group math game.',
      startDate: '2020-06-04',
      endDate: '2020-06-05',
      assignmentURL: null,
      userId: tandid.id,
      courseId: math.id
    }),
    Assignment.create({
      title: 'Spelling Bee Challenge',
      description: 'Group spelling game.',
      startDate: '2020-06-04',
      endDate: '2020-06-05',
      assignmentURL: null,
      userId: tandid.id,
      courseId: english.id
    }),
    Assignment.create({
      title: 'Collaborative Painting',
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
      courseId: java.id,
      grade: '90',
      isComplete: true
    }),
    Userassignment.create({
      userId: student1.id,
      userName: `${student1.firstName} ${student1.lastName}`,
      assignmentId: assign2.id,
      courseId: java.id,
      grade: '85',
      isComplete: true
    }),
    Userassignment.create({
      userId: student1.id,
      userName: `${student1.firstName} ${student1.lastName}`,
      assignmentId: assign3.id,
      courseId: java.id,
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
      courseId: java.id,
      grade: '80',
      isComplete: true
    }),
    Userassignment.create({
      userId: student2.id,
      userName: `${student2.firstName} ${student2.lastName}`,
      assignmentId: assign2.id,
      courseId: java.id,
      grade: '75',
      isComplete: true
    }),
    Userassignment.create({
      userId: student2.id,
      userName: `${student2.firstName} ${student2.lastName}`,
      assignmentId: assign3.id,
      courseId: java.id,
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
      courseId: java.id,
      grade: '75',
      isComplete: true
    }),
    Userassignment.create({
      userId: student3.id,
      userName: `${student3.firstName} ${student3.lastName}`,
      assignmentId: assign2.id,
      courseId: java.id,
      grade: '75',
      isComplete: true
    }),
    Userassignment.create({
      userId: student3.id,
      userName: `${student3.firstName} ${student3.lastName}`,
      assignmentId: assign3.id,
      courseId: java.id,
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
