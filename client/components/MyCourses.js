import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'
import CreateCourse from './CreateCourse.js'
import {ThemeProvider, Fab} from '@material-ui/core/'
import theme from './Theme'
import AddIcon from '@material-ui/icons/Add'

class MyCourses extends React.Component {
  constructor() {
    super()
    this.state = {
      toggle: false
    }
  }

  render() {
    const {toggle} = this.state
    const {user, myCourses, history} = this.props

    return (
      <ThemeProvider theme={theme}>
        <div>
          <div className="courses-wrapper">
            <h1>My Courses</h1>
            {user.isTeacher && (
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => this.setState({toggle: !toggle})}
              >
                <AddIcon />
              </Fab>
            )}
          </div>
          {toggle && <CreateCourse history={history} />}
          <div className="course-card-wrapper">
            {myCourses.map(course => {
              return <CourseCard key={course.id} {...course} />
            })}
          </div>
        </div>
      </ThemeProvider>
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
