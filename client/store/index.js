import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {user, teachers, students} from './user'
import assignment from './assignment'
import {announcements} from './announcement'
import {lessons} from './lesson'
import {courses, course} from './course'
import userassignment from './userassignment'

const reducer = combineReducers({
  user,
  teachers,
  students,
  assignment,
  course,
  courses,
  announcements,
  lessons,
  userassignment
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './course'
export * from './announcement'
export * from './lesson'
export * from './userassignment'
