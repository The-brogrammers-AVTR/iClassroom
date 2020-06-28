import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  LoginForm,
  SignupForm,
  Assignments,
  Home,
  Announcements,
  Lessons,
  Students,
  ManageAssignments,
  Profile,
  Grades,
  Verification,
  Live,
  ReportCard,
  TestStudent,
  UploadExcel
} from './components'
import {
  me,
  getCourses,
  getTeachers,
  getStudents,
  getAnnouncements,
  getLessons,
  readUserassignments,
  getUserCourses,
  readAssignments,
  getTest
} from './store'
import Video2 from './components/video/Video2'
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const {isLoggedIn, user, isTeacher} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        {isLoggedIn && (
          <Switch>
            {user.isTeacher === null ? (
              <Route exact path="/" component={Verification} />
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/course/:id/students" component={Students} />
                <Route
                  path="/course/:id/announcements"
                  component={Announcements}
                />
                <Route path="/course/:id/lessons" component={Lessons} />
                <Route path="/course/:id/grades" component={Grades} />
                <Route path="/course/:id/assignments" component={Assignments} />
                <Route path="/course/:id/chatroom" component={Live} />
                {isTeacher ? (
                  <Route
                    path="/course/:id/test/:testId"
                    component={UploadExcel}
                  />
                ) : (
                  <Route
                    path="/course/:id/test/:testId"
                    component={TestStudent}
                  />
                )}
                <Route
                  path="/manageassignments"
                  component={ManageAssignments}
                />
                <Route path="/profile" component={Profile} />
                <Route path="/test" component={Profile} />
                <Route path="/video" component={Video2} />
                <Route path="/reportcard" component={ReportCard} />
              </Switch>
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={LoginForm} />
      </Switch>
    )
  }
}
const mapState = ({user}) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!user.id,
    isTeacher: !!user.isTeacher,
    user
  }
}
const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getTest())
      dispatch(getCourses())
      dispatch(getTeachers())
      dispatch(getStudents())
      dispatch(getAnnouncements())
      dispatch(getLessons())
      dispatch(readUserassignments())
      dispatch(getUserCourses())
      dispatch(readAssignments())
      dispatch(me())
    }
  }
}
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
