import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import axios from 'axios'

class Announcements extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {course, teachers} = this.props
    const instructor = teachers.find(teacher =>
      course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )

    if (!course || !instructor) {
      return null
    }
    return (
      <div className="course-home-wrapper">
        <Sidebar {...course} instructor={instructor} />
        <div className="course-content">
          <h1>Content Goes Here</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, teachers}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))
  return {course, teachers}
}

export default connect(mapStateToProps)(Announcements)
