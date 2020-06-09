import React, {Fragment} from 'react'
//Material-UI
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  cell: {
    padding: 2
  },
  button: {
    padding: 8
  }
})

const TableAssignments = ({assignment, remove}) => {
  //console.log('table', assignment)
  const classes = useStyles()
  if (!assignment) {
    return null
  }
  return (
    <Fragment>
      <h1>Assignments</h1>
      <TableContainer>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Done</TableCell>
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
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                {/* <TableCell align="left" className={classes.cell}>
                  <IconButton className={classes.button}>
                    <DoneIcon />
                  </IconButton>
                </TableCell> */}
                {/* <TableCell align="left" className={classes.cell}>
                  <IconButton
                    className={classes.button}
                    onClick={() => remove(assignment.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell> */}
                <TableCell align="left">{assignment.id}</TableCell>
                <TableCell align="left">{assignment.name}</TableCell>
                <TableCell align="left">{assignment.courseId}</TableCell>
                <TableCell align="left">{assignment.category}</TableCell>
                <TableCell align="left">{assignment.description}</TableCell>
                <TableCell align="left">{assignment.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default TableAssignments
