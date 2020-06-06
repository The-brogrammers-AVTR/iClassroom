import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_TEACHERS = 'GET_TEACHERS'
const GET_STUDENTS = 'GET_STUDENTS'

const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const _getTeachers = teachers => ({type: GET_TEACHERS, teachers})
const _getStudents = students => ({type: GET_STUDENTS, students})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

const getTeachers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users/teachers')
    dispatch(_getTeachers(response.data))
  }
}
const getStudents = () => {
  return async dispatch => {
    const response = await axios.get('/api/users/students')
    dispatch(_getStudents(response.data))
  }
}

const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const user = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

const teachers = (state = [], action) => {
  switch (action.type) {
    case GET_TEACHERS:
      return action.teachers
    default:
      return state
  }
}

const students = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students
    default:
      return state
  }
}

export {me, auth, logout, getTeachers, getStudents, user, teachers, students}
