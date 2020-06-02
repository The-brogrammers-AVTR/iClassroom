import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import {Link} from 'react-router-dom'

class Courses extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {courses} = this.props
    return (
      <div>
        <div>
          <div className="courses-wrapper">
            <h1> Courses </h1>
            <Link className="add-button" to="/createCourse">
              +
            </Link>
          </div>
          <div className="course-card-wrapper">
            {courses.map(course => {
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
  return {courses, user}
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(getCourses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
