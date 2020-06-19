import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import EditIcon from '@material-ui/icons/Edit'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  },
  table: {
    minWidth: 650,
    width: '80%',
    margin: 'auto'
  }
})

function createData(name, id, userassignments) {
  return {
    name,
    id,
    assignments: userassignments.map(userassign => ({
      date: userassign.assignment.startDate,
      assignment: userassign.assignment.title,
      complete: userassign.isComplete ? 'Yes' : 'No',
      grade: userassign.grade
    }))
  }
}

function Row(props) {
  const {row} = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Assignments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Assignment</TableCell>
                    <TableCell align="left">Complete</TableCell>
                    <TableCell align="left">Grade</TableCell>
                    <TableCell align="left">Edit Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.assignments.map((userassignRow, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {userassignRow.date}
                      </TableCell>
                      <TableCell>{userassignRow.assignment}</TableCell>
                      <TableCell align="left">
                        {userassignRow.complete}
                      </TableCell>
                      <TableCell align="left">{userassignRow.grade}</TableCell>
                      <TableCell align="left">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const TeacherGrading = ({students, userassignments}) => {
  const classes = useRowStyles()
  console.log(students)
  console.log(userassignments)
  const rows = students.map(student =>
    createData(
      `${student.firstName} ${student.lastName}`,
      student.id,
      userassignments.filter(userassign => userassign.userId === student.id)
    )
  )
  return (
    <TableContainer>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Student Name</TableCell>
            <TableCell align="left">Student ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => <Row key={idx} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TeacherGrading
