import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import CreateCourse from './CreateCourse.js'

class MyCourses extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
  }

  render() {
    const {active} = this.state
    const {user, myCourses, history} = this.props

    return (
      <div>
        <div>
          <div className="courses-wrapper">
            <h1>My Courses</h1>
            {user.isTeacher && (
              <button
                className="default-button"
                type="button"
                onClick={() => this.setState({active: !active})}
              >
                Create Course
              </button>
            )}
          </div>
          {this.state.active && <CreateCourse history={history} />}
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

const mapStateToProps = ({courses, user, coursess}, {history}) => {
  let myCourses = []
  let myIdsCourses = coursess.filter(cor => {
    console.log('cor cor cor', cor)
    if (cor.userId === user.id) {
      console.log(cor.userId === user.id, cor.userId, user.id, cor.courseId)
      return cor.courseId
    }

    // const myCourses = courses.filter(course => {
    //   if (course.UserCourses.length > 0) {
    //     return course.UserCourses.find(
    //       usercourse => user.id === usercourse.userId
    //     )
    //   }
    // })
  })

  courses.filter(value =>
    myIdsCourses.filter(val => {
      if (value.id === val.courseId) {
        myCourses.push(value)

        return value
      }
    })
  )
  console.log('my ids corses', 'aaaa', myCourses)
  return {user, myCourses, history}
}

export default connect(mapStateToProps)(MyCourses)
