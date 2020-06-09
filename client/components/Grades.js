import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import OneStudentGrades from './OneStudentGrades'
import TeacherGrades from './TeacherGrades'

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
    const isInstructor = instructor.id === user.id
    //console.log('course', course)
    console.log('haha', userassignmentsForCourse)
    return (
      <Fragment>
        <h1>Grades</h1>

        {isInstructor ? (
          <TeacherGrades
            userassignments={userassignmentsForCourse}
            course={course}
          />
        ) : (
          <OneStudentGrades userassignments={oneUserassignments} user={user} />
        )}
      </Fragment>

      // <Grid container>
      //   <Sidebar {...course} instructor={instructor} />
      //   {isInstructor ? (
      //     <Grid item xs={12} sm={11}>
      //       <ManageAssignments assignment={assignmentsForCourse} />
      //     </Grid>
      //   ) : (
      //     <Grid item xs={12} sm={11}>
      //       <TableAssignments
      //         assignment={assignmentsForCourse}
      //         remove={remove}
      //       />
      //     </Grid>
      //   )}
      // </Grid>
    )
  }
}

const mapStateToProps = (
  {userassignment, user, courses, teachers},
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
    teachers
  }
}

export default connect(mapStateToProps)(Grades)

// {/* <ul>
//           {this.props.userassignment.map(assign => (
//             <li key={assign.id}>{`${assign.assignmentId}: ${assign.grade}`}</li>
//           ))}
//         </ul> */}
