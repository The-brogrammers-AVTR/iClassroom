import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  Login,
  Signup,
  Home,
  Assignments,
  Announcements,
  Chat,
  MakeAssignment,
  Lessons,
  Students,
  ManageAssignments
} from './components'

import {
  me,
  getCourses,
  getTeachers,
  getStudents,
  getAnnouncements,
  getLessons
} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={Home} />
            <Route path="/course/:id/students" component={Students} />
            <Route path="/course/:id/announcements" component={Announcements} />
            <Route path="/course/:id/lessons" component={Lessons} />
            <Route path="/course/:id/grades" component={Announcements} />
            <Route path="/course/:id/videocall" component={Chat} />
            <Route path="/course/:id/chatroom" component={Chat} />
            <Route path="/course/:id/assignments" component={Assignments} />
            <Route path="/makeassignment" component={MakeAssignment} />
            <Route path="/manageassignments" component={ManageAssignments} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getCourses())
      dispatch(getTeachers())
      dispatch(getStudents())
      dispatch(getAnnouncements())
      dispatch(getLessons())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
