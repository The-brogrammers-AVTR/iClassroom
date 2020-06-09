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
    minWidth: 650
  },
  cell: {
    padding: 2
  },
  button: {
    padding: 8
  }
})

const OneStudentGrades = ({userassignments}) => {
  console.log('student', userassignments)

  const classes = useStyles()
  if (!userassignments) {
    return null
  }
  return (
    <Fragment>
      <TableContainer>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Assignment ID</TableCell>
              <TableCell align="left">Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userassignments.map(assign => (
              <TableRow key={assign.id}>
                <TableCell align="left">{assign.assignmentId}</TableCell>
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
