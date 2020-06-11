import React, {Component} from 'react'
import {connect} from 'react-redux'
import {readAssignments} from '../store/assignment'
import {deleteAssignment} from '../store/assignment'
import TableAssignments from './tableAssignments'
import Sidebar from './Sidebar'
import {Grid} from '@material-ui/core'
import ManageAssignments from './ManageAssignments'
import {readUserassignments} from '../store/userassignment'

class Assignments extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    //console.log('props', this.props)
    const {course, teachers, remove, user} = this.props
    const instructor = teachers.find(teacher =>
      course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )

    //console.log('current user', user)
    const isInstructor = instructor.id === user.id
    const theUserassignments = this.props.userassignment.filter(
      userassignment => userassignment.userId === user.id
    )
    //console.log('current user assignments', theUserassignments)

    const assignmentsForCourse = this.props.assignment.filter(
      assignment => assignment.courseId === course.id
    )
    //console.log('assignments', assignmentsForCourse)

    if (!this.props.assignment || !instructor) {
      return null
    }
    return (
      <Grid container>
        <Sidebar {...course} instructor={instructor} />
        {isInstructor ? (
          <Grid item xs={12} sm={11}>
            <ManageAssignments
              assignment={assignmentsForCourse}
              course={course}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={11}>
            <TableAssignments
              assignment={assignmentsForCourse}
              remove={remove}
            />
          </Grid>
        )}
      </Grid>
    )
  }
}

const mapStateToProps = (
  {courses, teachers, assignment, user, userassignment},
  {match}
) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))
  return {course, teachers, assignment, user, userassignment}
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(readAssignments())
      dispatch(readUserassignments())
    },
    remove: id => {
      dispatch(deleteAssignment(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
