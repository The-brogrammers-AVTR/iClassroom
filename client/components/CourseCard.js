import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

class CourseCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {id, name, code, teachers, UserCourses, user} = this.props
    const instructor = teachers.find(teacher =>
      UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )

    if (!instructor) {
      return null
    }
    return (
      <li key={id} className="course-card">
        <h2>
          {name} - {code}
        </h2>
        <h4 key={instructor.id}>Instructor: {instructor.firstName}</h4>
        <Link to={`/course/${id}/announcements`}>Enter Class</Link>
        <br />
        {/* <Link
          to={`/course/${id}/announcements?userName=${user.email}&room=${name}`}
        >
          ChatRoom
        </Link> */}
        <br />
        <button> Edit Course </button>
      </li>
    )
  }
}

const mapStateToProps = ({user, teachers}) => {
  return {
    user,
    teachers
  }
}

export default connect(mapStateToProps)(CourseCard)
