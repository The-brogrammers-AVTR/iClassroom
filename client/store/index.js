import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {user, teachers} from './user'
import assignment from './assignment'
import {announcements} from './announcement'
import {courses, course} from './course'

const reducer = combineReducers({
  user,
  teachers,
  assignment,
  course,
  courses,
  announcements
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './course'
export * from './announcement'
