import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import CreateCourse from './CreateCourse.js'
import {ThemeProvider, Fab, Tooltip} from '@material-ui/core/'
import theme from './Theme'
import AddIcon from '@material-ui/icons/Add'

class MyCourses extends React.Component {
  constructor() {
    super()
    this.state = {
      toggle: false
    }
  }

  render() {
    const {toggle} = this.state
    const {user, myCourses, history} = this.props

    return (
      <ThemeProvider theme={theme}>
        <div>
          <div className="courses-wrapper">
            <h1>My Courses</h1>
            {user.isTeacher && (
              <Tooltip title="Add Course">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => this.setState({toggle: !toggle})}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}
          </div>
          {toggle && <CreateCourse history={history} />}
          <div className="course-card-wrapper">
            {myCourses.map(course => {
              return <CourseCard key={course.id} {...course} />
            })}
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = ({courses, user, coursess}, {history}) => {
  let myCourses = []
  let myIdsCourses = coursess.filter(cor => {
    if (cor.userId === user.id) {
      return cor.courseId
    }
  })

  courses.filter(value =>
    myIdsCourses.filter(val => {
      if (value.id === val.courseId) {
        myCourses.push(value)

        return value
      }
    })
  )
  return {user, myCourses, history}
}

export default connect(mapStateToProps)(MyCourses)
