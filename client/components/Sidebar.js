import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Sidebar extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {courses, user} = this.props

    return (
      <div className="course-sidebar">
        <div className="course-info">
          <p>Course Name</p>
          <p>Course Code</p>
          <p>Instructor Name</p>
          <p>Contact Info</p>
          <p>Syllabus Link</p>
        </div>
        <div className="course-navigation">
          {user.isTeacher === true && <button>Students</button>}
          <button> Announcements </button>
          <button> Lessons </button>
          <button> Assignments </button>
          <button> Grades </button>
          <button> Video Call </button>
          <Link to="/home"> Back to Courses</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, user}) => {
  return {courses, user}
}

export default connect(mapStateToProps)(Sidebar)
