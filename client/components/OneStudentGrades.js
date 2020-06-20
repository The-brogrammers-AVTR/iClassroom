import React, {Fragment} from 'react'
//Material-UI
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {user} from '../store'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '50%',
    margin: 'auto'
  },
  cell: {
    padding: 2
  },
  button: {
    padding: 8
  }
})

const OneStudentGrades = ({userassignments, user, course}) => {
  const classes = useStyles()
  if (!userassignments) {
    return null
  }
  return (
    <Fragment>
      <h1>{`Grade (Student: ${user.firstName} ${user.lastName})`}</h1>
      <TableContainer>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Assignment</TableCell>
              <TableCell align="left">Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userassignments
              .filter(userassign => userassign.courseId === course.id)
              .map(assign => (
                <TableRow key={assign.id}>
                  <TableCell align="left">{assign.assignment.title}</TableCell>
                  <TableCell align="left">{assign.grade}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default OneStudentGrades
