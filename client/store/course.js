import axios from 'axios'
import {createUserCourse} from './userCourses'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_COURSES = 'GET_COURSES'
const GET_DETAILS = 'GET_DETAILS'
const CREATE_COURSE = 'CREATE_COURSE'
const UPDATE_COURSE = 'UPDATE_COURSE'
const REMOVE_COURSE = 'REMOVE_COURSE'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getCourses = courses => ({type: GET_COURSES, courses})
const _getDetails = course => ({type: GET_DETAILS, course})
const _createCourse = course => ({type: CREATE_COURSE, course})
const _updateCourse = course => ({type: UPDATE_COURSE, course})
const _removeCourse = id => ({type: REMOVE_COURSE, id})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getCourses = () => {
  return async dispatch => {
    const response = await axios.get('/api/courses')
    // console.log('get corses after create', response.data)
    dispatch(_getCourses(response.data))
  }
}

const getDetails = id => {
  return async dispatch => {
    const response = await axios.get(`/api/courses/${id}`)
    dispatch(_getDetails(response.data))
  }
}

const createCourse = (course, push) => {
  return async dispatch => {
    const response = await axios.post('/api/courses', course)
    console.log('created course', response.data)
    dispatch(_createCourse(response.data))
    dispatch(createUserCourse(course.userId, response.data.id, push))
    //push('/')
  }
}

const updateCourse = (course, id, push) => {
  return async dispatch => {
    const {data: updatedCourse} = await axios.put(`/api/courses/${id}`, course)
    dispatch(_updateCourse(updatedCourse))
    // push('/')
  }
}

const removeCourse = id => {
  return async dispatch => {
    await axios.delete(`/api/courses/${id}`)
    dispatch(_removeCourse(id))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
const courses = function(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return action.courses

    case CREATE_COURSE:
      return [...state, action.course]

    case REMOVE_COURSE:
      return state.filter(course => course.id !== action.id)

    case UPDATE_COURSE:
      state = state.map(
        course => (course.id === action.course.id ? action.course : course)
      )
      return state

    default:
      return state
  }
}

const course = function(state = {}, action) {
  switch (action.type) {
    case GET_DETAILS:
      state = action.course
      return state

    case UPDATE_COURSE:
      state = action.course
      return state

    default:
      return state
  }
}

export {
  courses,
  course,
  getCourses,
  getDetails,
  createCourse,
  removeCourse,
  updateCourse
}
