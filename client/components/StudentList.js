import React from 'react'
import {Link} from 'react-router-dom'
import {admitUserCourse} from '../store'
import {connect} from 'react-redux'
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import theme from './Theme'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core/'

const useStyles = makeStyles({
  table: {
    margin: theme.spacing(5)
  }
})

const StudentList = ({
  courseId,
  filteredStudents,
  waitingStudents,
  admitStudent
}) => {
  const classes = useStyles()
  console.log('Students awaiting enrollments ', waitingStudents)

  return (
    <ThemeProvider theme={theme}>
      <TableContainer className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Overall Grade</TableCell>
              <TableCell align="center">Admit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents &&
              filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell align="center">{student.firstName}</TableCell>
                  <TableCell align="center">{student.lastName}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">A</TableCell>
                </TableRow>
              ))}

            {waitingStudents &&
              waitingStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell align="center">{student.firstName}</TableCell>
                  <TableCell align="center">{student.lastName}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">N/A</TableCell>
                  <TableCell align="center">
                    <button
                      type="submit"
                      onClick={() => admitStudent(courseId, student.id)}
                    >
                      Accept
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  )
}

const mapStateToProps = ({students}) => {
  return {
    students
  }
}
const mapDispatchToProps = dispatch => {
  return {
    admitStudent: (courseId, userId) => {
      console.log('mapDispatch -- admit', courseId, userId)
      dispatch(admitUserCourse(courseId, userId)) //put thunk
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentList)
