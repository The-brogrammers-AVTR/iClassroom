import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import StudentList from './StudentList.js'
import {Link} from 'react-router-dom'

class Students extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {course, instructor, filteredStudents, user} = this.props
    console.log(filteredStudents)

    if (!course || !instructor || !filteredStudents) {
      return null
    }
    return (
      <div className="course-home-wrapper">
        <Sidebar {...course} instructor={instructor} />
        <div className="course-content">
          <div className="course-content-header">
            <h1>Students</h1>
            {user.isTeacher === true && (
              <Link className="add-button" to="/addStudent">
                +
              </Link>
            )}
          </div>
          <div>
            <StudentList filteredStudents={filteredStudents} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, teachers, students, user}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))

  const instructor = teachers.find(teacher =>
    course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
  )

  const filteredStudents = students.filter(student =>
    course.UserCourses.find(usercourse => usercourse.userId === student.id)
  )

  return {course, instructor, filteredStudents, user}
}

export default connect(mapStateToProps)(Students)
