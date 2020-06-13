import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_TEACHERS = 'GET_TEACHERS'
const GET_STUDENTS = 'GET_STUDENTS'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
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
const _updateProfile = user => ({type: UPDATE_PROFILE, user})

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

const authLogin = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/login', {
      email,
      password
    })
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

const authSignup = (
  email,
  password,
  firstName,
  lastName,
  isTeacher
) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/signup', {
      email,
      password,
      firstName,
      lastName,
      isTeacher
    })
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

const updateProfile = (user, id, push) => {
  return async dispatch => {
    const {data: updatedUser} = await axios.put(`/api/users/${id}`, user)
    console.log('from store after data base', {data: updatedUser})
    dispatch(_updateProfile(updatedUser))
    push('/')
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
    case UPDATE_PROFILE:
      return action.user
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

export {
  me,
  authLogin,
  authSignup,
  logout,
  getTeachers,
  getStudents,
  user,
  teachers,
  students,
  updateProfile
}
