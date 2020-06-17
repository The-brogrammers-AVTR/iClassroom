import React from 'react'
import {Link} from 'react-router-dom'
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

const StudentList = ({filteredStudents}) => {
  const classes = useStyles()
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
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <Link to="/"> Student Report</Link>
                  </td> */}

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

export default connect(mapStateToProps)(StudentList)
