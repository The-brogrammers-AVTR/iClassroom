import axios from 'axios'
import {getCourses} from './course'
import store from './index'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_USER_COURSES = 'GET_USER_COURSES'
//const GET_DETAILS = 'GET_DETAILS'
const CREATE_USER_COURSE = 'CREATE_USER_COURSE'
const JOIN_USER_COURSE = 'JOIN_USER_COURSE'
const ADMIT_USER_COURSE = 'ADMIT_USER_COURSE'
//const UPDATE_COURSE = 'UPDATE_COURSE'
//const REMOVE_COURSE = 'REMOVE_COURSE'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getUserCourses = courses => ({type: GET_USER_COURSES, courses})
//const _getDetails = course => ({type: GET_DETAILS, course})
const _createUserCourse = course => ({type: CREATE_USER_COURSE, course})
//const _updateCourse = course => ({type: UPDATE_COURSE, course})
//const _removeCourse = id => ({type: REMOVE_COURSE, id})
const _joinUserCourse = course => ({type: JOIN_USER_COURSE, course})

const _admitUserCourse = course => ({type: ADMIT_USER_COURSE, course})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getUserCourses = () => {
  return async dispatch => {
    const response = await axios.get('/api/usercourses')
    console.log('get user corses ', response.data)
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
    // dispatch(getUserCourses())
  }
  //
  //
}
// const getDetails = id => {
//   return async dispatch => {
//     const response = await axios.get(`/api/courses/${id}`)
//     dispatch(_getDetails(response.data))
//   }
// }

// const createCourse = (course, push) => {
//   return async dispatch => {
//     const response = await axios.post('/api/courses', course)
//     dispatch(_createCourse(response.data))
//     getCourses()
//     push('/')
//   }
// }

// const updateCourse = (course, push) => {
//   return async dispatch => {
//     const {data: updatedCourse} = await axios.put(
//       `/api/courses/${course.id}`,
//       course
//     )
//     dispatch(_updateCourse(updatedCourse))
//     push('/')
//   }
// }

// const removeCourse = id => {
//   return async dispatch => {
//     await axios.delete(`/api/courses/${id}`)
//     dispatch(_removeCourse(id))
//   }
// }

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
    //state= state.map()
    // case REMOVE_COURSE:
    //   return state.filter(course => course.id !== action.id)

    // case UPDATE_COURSE:
    //   state = state.map(course =>
    //     course.id === action.course.id ? action.course : course
    //   )
    //   return state

    default:
      return state
  }
}

// const course = function(state = {}, action) {
//   switch (action.type) {
//     case GET_DETAILS:
//       state = action.course
//       return state

//     case UPDATE_COURSE:
//       state = action.course
//       return state

//     default:
//       return state
//   }
// }

export {
  coursess,
  getUserCourses,
  createUserCourse,
  joinUserCourse,
  admitUserCourse
}
