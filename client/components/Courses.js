import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import {Link} from 'react-router-dom'

class Courses extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {user, filteredCourses} = this.props

    return (
      <div>
        <div>
          <div className="courses-wrapper">
            <h1> Courses </h1>
            {user.isTeacher === true && (
              <Link className="add-button" to="/createCourse">
                +
              </Link>
            )}
          </div>
          <div className="course-card-wrapper">
            {filteredCourses.map(course => {
              return <CourseCard key={course.id} {...course} />
            })}
          </div>
        </div>
        <div>
          <h1> Calendar Goes Here </h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, user}) => {
  const filteredCourses = courses.filter(course => {
    if (course.UserCourses.length > 0) {
      return course.UserCourses.find(
        usercourse => user.id === usercourse.userId
      )
    }
  })
  return {user, filteredCourses}
}

export default connect(mapStateToProps)(Courses)
