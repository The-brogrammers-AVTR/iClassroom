import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import LessonCard from './LessonCard.js'
import {Link} from 'react-router-dom'

class Lessons extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {course, instructor, filteredLessons, user} = this.props

    if (!course || !instructor || !filteredLessons) {
      return null
    }
    return (
      <div className="course-home-wrapper">
        <Sidebar {...course} instructor={instructor} />
        <div className="course-content">
          <div className="course-content-header">
            <h1>Lessons</h1>
            {user.isTeacher === true && (
              <Link className="add-button" to="/createAnnouncement">
                +
              </Link>
            )}
          </div>
          <div>
            {filteredLessons.map(lesson => {
              return <LessonCard key={lesson.id} {...lesson} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, teachers, lessons, user}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))

  const instructor = teachers.find(teacher =>
    course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
  )

  const filteredLessons = lessons.filter(
    lesson => lesson.courseId === course.id
  )
  return {course, instructor, filteredLessons, user}
}

export default connect(mapStateToProps)(Lessons)
