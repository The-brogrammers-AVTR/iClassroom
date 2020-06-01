import axios from 'axios'

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
    dispatch(_createCourse(response.data))
    push('/home')
  }
}

const updateCourse = (course, push) => {
  return async dispatch => {
    const {data: updatedCourse} = await axios.put(
      `/api/courses/${course.id}`,
      course
    )
    dispatch(_updateCourse(updatedCourse))
    push('/home')
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
