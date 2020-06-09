import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import LessonCard from './LessonCard.js'
import {ThemeProvider, Fab} from '@material-ui/core/'
import theme from './Theme'
import AddIcon from '@material-ui/icons/Add'
import CreateLesson from './CreateLesson.js'

class Lessons extends React.Component {
  constructor() {
    super()
    this.state = {
      toggle: false
    }
  }
  render() {
    const {toggle} = this.state

    const {course, instructor, filteredLessons, user, history} = this.props

    if (!course || !instructor || !filteredLessons) {
      return null
    }
    return (
      <ThemeProvider theme={theme}>
        <div className="course-home-wrapper">
          <Sidebar {...course} instructor={instructor} />
          <div className="course-content">
            <div className="course-content-header">
              <h1>Lessons</h1>
              {user.isTeacher === true && (
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => this.setState({toggle: !toggle})}
                >
                  <AddIcon />
                </Fab>
              )}
            </div>
            <div>
              {toggle && <CreateLesson {...course} {...history} />}
              {filteredLessons.map((lesson, idx) => {
                return <LessonCard key={lesson.id} idx={idx} {...lesson} />
              })}
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = ({courses, teachers, lessons, user}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))

  const instructor = teachers.find(teacher =>
    course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
  )

  const filteredLessons = lessons.filter(
    lesson => lesson.courseId === course.id
  )
  return {course, instructor, filteredLessons, user}
}

export default connect(mapStateToProps)(Lessons)
