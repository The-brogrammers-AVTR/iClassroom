import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import {Link} from 'react-router-dom'

class MyCourses extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {user, myCourses} = this.props

    return (
      <div>
        <div>
          <div className="courses-wrapper">
            <h1>My Courses</h1>
            {user.isTeacher && (
              <Link className="add-button" to="/createCourse">
                +
              </Link>
            )}
          </div>
          <div className="course-card-wrapper">
            {myCourses.map(course => {
              return <CourseCard key={course.id} {...course} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, user}) => {
  const myCourses = courses.filter(course => {
    if (course.UserCourses.length > 0) {
      return course.UserCourses.find(
        usercourse => user.id === usercourse.userId
      )
    }
  })

  return {user, myCourses}
}

export default connect(mapStateToProps)(MyCourses)
