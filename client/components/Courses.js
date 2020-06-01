import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'

class Courses extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {courses} = this.props
    return (
      <div>
        <div>
          <h1> Courses </h1>
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
