import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Courses extends React.Component {
  constructor() {
    super()
    this.state = {
      userCourses: []
    }
  }

  async componentDidMount() {
    await axios.get('/api/usercourses').then(response => {
      this.setState({
        userCourses: response.data
      })
    })
  }

  render() {
    const {user, courses} = this.props
    const {userCourses} = this.state
    const userFiltered = userCourses.filter(
      userCourse => userCourse.userId === user.id
    )
    const coursesFiltered = courses.filter(course =>
      userFiltered.includes(filtered => course.id === filtered.courseId)
    )
    console.log({
      user,
      courses,
      userCourses,
      userFiltered,
      coursesFiltered
    })
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
