import React from 'react'

//Material-UI
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

const TableAssignments = ({assignment, remove}) => {
  console.log('table', assignment)
  const classes = useStyles()
  if (!assignment) {
    return null
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left" />
            <TableCell align="left">Assignment ID</TableCell>
            <TableCell align="left">Assignment</TableCell>
            <TableCell align="left">Course</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Teacher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignment.map(assignment => (
            <TableRow key={assignment.id}>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">
                <Button onClick={() => remove(assignment.id)}>Remove</Button>
              </TableCell>
              <TableCell align="left">{assignment.id}</TableCell>
              <TableCell align="left">{assignment.name}</TableCell>
              <TableCell align="left">{assignment.courseId}</TableCell>
              <TableCell align="left">{assignment.category}</TableCell>
              <TableCell align="left">{assignment.description}</TableCell>
              <TableCell align="left">{assignment.teacherId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableAssignments
