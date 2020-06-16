import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'

class FindCourses extends React.Component {
  constructor() {
    super()
    this.state = {
      subject: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({
      subject: ev.target.value
    })
  }

  render() {
    const {subject} = this.state
    const {openCourses} = this.props

    let filteredCourses
    if (subject !== '') {
      filteredCourses = openCourses.filter(course => course.subject === subject)
    } else {
      filteredCourses = openCourses
    }

    return (
      <div>
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
        <div className="course-card-wrapper">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, user}) => {
  const openCourses = courses.filter(course => course.isOpen === true)
  return {openCourses}
}

export default connect(mapStateToProps)(FindCourses)
