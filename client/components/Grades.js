import React, {Component} from 'react'
import {connect} from 'react-redux'
import OneStudentGrades from './OneStudentGrades'
import TeacherGrades from './TeacherGrades'
import TeacherGrading from './TeacherGrading'
import Sidebar from './Sidebar'
import {Grid} from '@material-ui/core'
import {updateUserassignment} from '../store/userassignment'

class Grades extends Component {
  constructor() {
    super()
  }

  render() {
    const {course, teachers, user, update, students} = this.props
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
    const filteredStudents = students.filter(student =>
      course.UserCourses.find(usercourse => usercourse.userId === student.id)
    )

    return (
      <Grid container>
        <Sidebar {...course} instructor={instructor} />
        {isInstructor ? (
          <Grid item xs={12} sm={11}>
            <TeacherGrades
              assignment={assignmentsForCourse}
              userassignments={userassignmentsForCourse}
              course={course}
              update={update}
            />
            {/* <TeacherGrading
              students={filteredStudents}
              userassignments={userassignmentsForCourse}
            /> */}
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
  {userassignment, user, courses, teachers, assignment, students},
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
    assignment,
    students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (id, userassignment) => {
      dispatch(updateUserassignment(id, userassignment))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grades)
