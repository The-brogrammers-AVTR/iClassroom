import React, {Component} from 'react'
import {connect} from 'react-redux'
import {readAssignments} from '../store/assignment'
import {deleteAssignment} from '../store/assignment'
import TableAssignments from './tableAssignments'
import Sidebar from './Sidebar'

class Assignments extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    //console.log('props', this.props)
    const {course, teachers, remove} = this.props
    const instructor = teachers.find(teacher =>
      course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )
    //console.log('ins', instructor)
    const assignmentsForCourse = this.props.assignment.filter(
      assignment => assignment.courseId === course.id
    )

    if (!this.props.assignment || !instructor) {
      return null
    }
    return (
      <div>
        <Sidebar {...course} instructor={instructor} />
        <TableAssignments assignment={assignmentsForCourse} remove={remove} />
      </div>
    )
  }
}

const mapStateToProps = ({courses, teachers, assignment}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))
  return {course, teachers, assignment}
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(readAssignments())
    },
    remove: id => {
      dispatch(deleteAssignment(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
