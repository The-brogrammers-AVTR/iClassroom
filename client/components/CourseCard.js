import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CourseCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {
      id,
      name,
      code,
      gradeLevel,
      teachers,
      UserCourses,
      isOpen,
      user
    } = this.props
    const instructor = teachers.find(teacher =>
      UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )
    const enrolled = UserCourses.some(
      usercourse => usercourse.userId === user.id
    )
    if (!instructor) {
      return null
    }
    return (
      <li key={id} className="course-card">
        <h2>
          {name} - {code}
        </h2>
        <p>Instructor: {instructor.firstName}</p>
        <p>Grade Level: {gradeLevel}</p>

        {enrolled ? (
          <Link to={`/course/${id}/announcements`}>Enter</Link>
        ) : isOpen === true ? (
          <button className="default-button" type="button">
            Request to Join
          </button>
        ) : (
          'Closed'
        )}
        <br />
        {user.isTeacher && <button type="button"> Edit Course </button>}
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
