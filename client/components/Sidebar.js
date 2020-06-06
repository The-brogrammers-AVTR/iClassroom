import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import Chat from './Chat'

class Sidebar extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {id, name, code, user, instructor} = this.props
    console.log(instructor, name, user)
    return (
      <div className="course-sidebar">
        <div className="course-info">
          <p>
            {name} - {code}
          </p>
          <p>
            {instructor.firstName} {instructor.lastName}
          </p>
          <p>{instructor.email}</p>
          <p>Syllabus Link</p>
        </div>
        <div className="course-navigation">
          {user.isTeacher === true && (
            <Link to={`/course/${id}/students`}>Students</Link>
          )}
          <Link to={`/course/${id}/announcements`}>Announcements</Link>
          <Link to={`/course/${id}/lessons`}>Lessons</Link>
          <Link to={`/course/${id}/assignments`}>Assignments</Link>
          <Link to={`/course/${id}/grades`}>Grades</Link>
          <Link to={`/course/${id}/canvas`}>White Board</Link>
          <Link
            to={`/course/${id}/chatroom?userName=${
              user.firstName
            }&room=${name}`}
          >
            Chat Room
          </Link>
          <Link to="/"> Back to Courses</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {user}
}

export default connect(mapStateToProps)(Sidebar)
