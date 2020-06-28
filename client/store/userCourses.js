import axios from 'axios'
import {getCourses} from './course'
import store from './index'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_USER_COURSES = 'GET_USER_COURSES'
const CREATE_USER_COURSE = 'CREATE_USER_COURSE'
const JOIN_USER_COURSE = 'JOIN_USER_COURSE'
const ADMIT_USER_COURSE = 'ADMIT_USER_COURSE'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getUserCourses = courses => ({type: GET_USER_COURSES, courses})
const _createUserCourse = course => ({type: CREATE_USER_COURSE, course})
const _joinUserCourse = course => ({type: JOIN_USER_COURSE, course})
const _admitUserCourse = course => ({type: ADMIT_USER_COURSE, course})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getUserCourses = () => {
  return async dispatch => {
    const response = await axios.get('/api/usercourses')
    dispatch(_getUserCourses(response.data))
  }
}
const createUserCourse = (userId, courseId, push) => {
  console.log('create user courses was trigered')
  return async dispatch => {
    console.log('next step inside the createUsercourse')
    const response = await axios.post('/api/usercourses', {
      userId: userId,
      courseId: courseId
    })
    console.log('create user courses ', response.data)
    dispatch(_createUserCourse(response.data))
    dispatch(getCourses())
    push('/')
  }
}
const joinUserCourse = (courseId, userId) => {
  console.log('Join User Course', courseId, userId)
  return async dispatch => {
    const response = await axios.post('/api/usercourses', {
      userId: userId,
      courseId: courseId,
      admit: false
    })
    console.log('create user courses ', response.data)
    dispatch(_joinUserCourse(response.data))
    dispatch(getCourses())
  }
}

const admitUserCourse = (courseId, userId) => {
  console.log('Accept Student', courseId, userId)
  let userCourseToUpdate = store.getState().UserCourse
  console.log(userCourseToUpdate)

  return async dispatch => {
    const admitUser = await axios.put('/api/usercourses', {
      userId: userId,
      courseId: courseId,
      admit: true
    }).data
    console.log('after put', admitUser)
    dispatch(_admitUserCourse(admitUser))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
const coursess = function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_COURSES:
      return action.courses

    case CREATE_USER_COURSE:
      return [...state, action.course]

    case JOIN_USER_COURSE:
      return [...state, action.course]
    case ADMIT_USER_COURSE:
      return [...state, action.course]

    default:
      return state
  }
}

export {
  coursess,
  getUserCourses,
  createUserCourse,
  joinUserCourse,
  admitUserCourse
}
