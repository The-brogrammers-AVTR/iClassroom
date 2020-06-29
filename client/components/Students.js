import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import StudentList from './StudentList.js'
import {ThemeProvider, Fab} from '@material-ui/core/'
import theme from './Theme'
import AddIcon from '@material-ui/icons/Add'
import AddStudent from './AddStudent.js'

class Students extends React.Component {
  constructor() {
    super()
    this.state = {
      toggle: false
    }
  }
  render() {
    const {toggle} = this.state
    const {
      course,
      instructor,
      filteredStudents,
      waitingStudents,
      user
    } = this.props
    console.log(course, instructor, filteredStudents, user)
    console.log(filteredStudents)

    if (!course || !instructor || !filteredStudents) {
      return <Sidebar {...course} instructor={instructor} />
    }
    return (
      <ThemeProvider theme={theme}>
        <div className="course-home-wrapper">
          <Sidebar {...course} instructor={instructor} />
          <div className="course-content">
            <div className="course-content-header">
              <h1>Students</h1>
              {toggle && <AddStudent {...course} {...history} />}
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
              <StudentList
                courseId={course.id}
                filteredStudents={filteredStudents}
                waitingStudents={waitingStudents}
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = ({courses, teachers, students, user}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))

  const instructor = teachers.find(teacher =>
    course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
  )

  const filteredStudents = students.filter(student =>
    course.UserCourses.find(
      usercourse =>
        usercourse.userId === student.id && usercourse.admit === true
    )
  )
  const waitingStudents = students.filter(student =>
    course.UserCourses.find(
      usercourse =>
        usercourse.userId === student.id && usercourse.admit === false
    )
  )
  console.log('Students: ', filteredStudents, waitingStudents)
  return {course, instructor, filteredStudents, waitingStudents, user}
}

export default connect(mapStateToProps)(Students)
