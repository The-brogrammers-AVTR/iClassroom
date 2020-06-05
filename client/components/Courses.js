import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import {Link} from 'react-router-dom'

class Courses extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
  }

  render() {
    const {user, filteredCourses, openCourses} = this.props
    console.log(this.state)
    console.log({OPEN: openCourses})
    if (!openCourses) {
      return null
    }
    return (
      <div>
        <div>
          <div className="courses-wrapper">
            <h1> Courses </h1>

            {user.isTeacher === true ? (
              <Link className="add-button" to="/createCourse">
                +
              </Link>
            ) : (
              <button
                onClick={() => {
                  this.setState({active: !this.state.active})
                }}
              >
                {this.state.active === false ? 'Find A Class' : 'My Courses'}
              </button>
            )}
          </div>
          <div className="course-card-wrapper">
            {this.state.active === true
              ? openCourses.map(course => (
                  <CourseCard key={course.id} {...course} />
                ))
              : filteredCourses.map(course => {
                  return <CourseCard key={course.id} {...course} />
                })}
          </div>
          <div className="course-card-wrapper" />
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

  const openCourses = courses.filter(course => course.isOpen === true)
  return {user, filteredCourses, openCourses}
}

export default connect(mapStateToProps)(Courses)
