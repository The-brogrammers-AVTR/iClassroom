import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteAssignment} from '../store/assignment'
import TableAssignments from './tableAssignments'
import Sidebar from './Sidebar'
import {Grid} from '@material-ui/core'
import ManageAssignments from './ManageAssignments'
import {createAssignment} from '../store/assignment'
import UploadExcel from './UploadExcel'
import {updateUserassignment} from '../store/userassignment'

class Assignments extends Component {
  constructor() {
    super()
  }

  render() {
    const {course, teachers, remove, user, save, load, update} = this.props
    const instructor = teachers.find(teacher =>
      course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )

    const isInstructor = instructor.id === user.id
    const theUserassignments = this.props.userassignment.filter(
      userassignment => userassignment.userId === user.id
    )

    const assignmentsForCourse = this.props.assignment.filter(
      assignment => assignment.courseId === course.id
    )

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
              remove={remove}
              save={save}
              load={load}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={11}>
            <TableAssignments
              assignment={assignmentsForCourse}
              update={update}
              userassignment={theUserassignments}
            />
          </Grid>
        )}
        {/* <div align="center">
          <UploadExcel />
          <div id="displayExcel" />
        </div> */}
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
    remove: id => {
      dispatch(deleteAssignment(id))
    },
    save: assignment => dispatch(createAssignment(assignment)),
    update: (id, userassignment) => {
      dispatch(updateUserassignment(id, userassignment))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
