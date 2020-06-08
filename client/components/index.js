/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as NavBar} from './NavBar'
export {Login, Signup} from './Auth-Form'
export {default as Chat} from './Chat'
export {default as Home} from './Home'
export {default as Announcements} from './Announcements'
export {default as Assignments} from './Assignments'
export {default as MakeAssignment} from './MakeAssignment'
export {default as TableAssignments} from './TableAssignments'
export {default as Sidebar} from './Sidebar'
export {default as Students} from './Students'
export {default as Profile} from './Profile'
export {default as Lessons} from './Lessons'
export {default as ManageAssignments} from './ManageAssignments'
export {default as Canvas} from './Canvas'
