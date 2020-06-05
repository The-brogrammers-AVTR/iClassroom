import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import {Link} from 'react-router-dom'

class Courses extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false,
      subject: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(ev) {
    this.setState({
      subject: ev.target.value
    })
  }

  onClick() {
    const {active} = this.state
    this.setState({
      active: !active
    })
  }

  render() {
    const {active, subject} = this.state
    const {user, myCourses, openCourses} = this.props

    let filteredProducts
    if (subject !== '') {
      filteredProducts = openCourses.filter(
        course => course.subject === subject
      )
    } else {
      filteredProducts = openCourses
    }

    return (
      <div>
        <div>
          <div className="courses-wrapper">
            <h1> {!active ? 'My Courses' : 'Find Courses'} </h1>
            {user.isTeacher ? (
              <Link className="add-button" to="/createCourse">
                +
              </Link>
            ) : (
              <button type="button" onClick={this.onClick}>
                {!active ? 'Find Courses' : 'My Courses'}
              </button>
            )}
          </div>
          {active && (
            <div className="search-bar">
              <p>Search by Subject</p>
              <select onChange={this.onChange} value={subject}>
                <option value="">All</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
              </select>
            </div>
          )}
          <div className="course-card-wrapper">
            {active
              ? filteredProducts.map(course => (
                  <CourseCard key={course.id} {...course} />
                ))
              : myCourses.map(course => {
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
  const myCourses = courses.filter(course => {
    if (course.UserCourses.length > 0) {
      return course.UserCourses.find(
        usercourse => user.id === usercourse.userId
      )
    }
  })

  const openCourses = courses.filter(course => course.isOpen === true)
  return {user, myCourses, openCourses}
}

export default connect(mapStateToProps)(Courses)
