import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import OneStudentGrades from './OneStudentGrades'
import TeacherGrades from './TeacherGrades'
import Sidebar from './Sidebar'
import {Grid} from '@material-ui/core'

class Grades extends Component {
  constructor() {
    super()
  }

  render() {
    const {course, teachers, user} = this.props
    const oneUserassignments = this.props.userassignment.filter(
      userassign => userassign.userId === this.props.user.id
    )
    const instructor = teachers.find(teacher =>
      course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )
    const userassignmentsForCourse = this.props.userassignment.filter(
      userassignment => userassignment.courseId === course.id
    )
    const assignmentsForCourse = this.props.assignment.filter(
      assign => assign.courseId === course.id
    )
    const isInstructor = instructor.id === user.id

    return (
      // <Fragment>
      //   <h1>Grades</h1>
      //   {isInstructor ? (
      //     <TeacherGrades
      //       assignment={assignmentsForCourse}
      //       userassignments={userassignmentsForCourse}
      //       course={course}
      //     />
      //   ) : (
      //     <OneStudentGrades userassignments={oneUserassignments} user={user} />
      //   )}
      // </Fragment>

      <Grid container>
        <Sidebar {...course} instructor={instructor} />
        {isInstructor ? (
          <Grid item xs={12} sm={11}>
            <TeacherGrades
              assignment={assignmentsForCourse}
              userassignments={userassignmentsForCourse}
              course={course}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={11}>
            <OneStudentGrades
              userassignments={oneUserassignments}
              user={user}
            />
          </Grid>
        )}
      </Grid>
    )
  }
}

const mapStateToProps = (
  {userassignment, user, courses, teachers, assignment},
  {match}
) => {
  if (!userassignment) {
    return {}
  }
  const course = courses.find(_course => _course.id === Number(match.params.id))
  return {
    userassignment,
    user,
    course,
    teachers,
    assignment
  }
}

export default connect(mapStateToProps)(Grades)
