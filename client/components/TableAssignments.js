import React, {useState, Fragment} from 'react'
//Material-UI
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import {storage} from '../firebase'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '90%',
    margin: 'auto'
  },
  cell: {
    padding: 2
  },
  button: {
    padding: 8
  }
})

const TableAssignments = ({assignment, userassignment, update}) => {
  const classes = useStyles()

  // const [_url, setUrl] = useState(
  //   userassignment.submissionURL ? userassignment.submissionURL : ''
  // )
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const handleUpload = (e, id) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      const uploadTask = storage.ref(`submissions/${file.name}`).put(file)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          )
          setProgress(progress)
        },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref('submissions')
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              update(id, {
                submissionURL: url,
                isComplete: true
              })
            })
        }
      )
    }
  }

  if (!assignment || !userassignment) {
    return null
  }
  console.log('assignment', assignment)
  console.log('userassignment', userassignment)
  return (
    <Fragment>
      <h1>Assignments</h1>
      <TableContainer>
        <Table className={classes.table} size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="left">Assignment#</TableCell>
              <TableCell align="left">Assignment</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">Due Date</TableCell>
              <TableCell align="left">Link</TableCell>
              <TableCell align="left">Submission</TableCell>
              <TableCell align="left">Submission Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignment.map((assignment, idx) => (
              <TableRow key={assignment.id}>
                <TableCell align="left">{assignment.id}</TableCell>
                <TableCell align="left">{assignment.title}</TableCell>
                <TableCell align="left">{assignment.description}</TableCell>
                <TableCell align="left">{assignment.startDate}</TableCell>
                <TableCell align="left">{assignment.endDate}</TableCell>
                <TableCell align="left">
                  {assignment.URL && (
                    <a
                      className="link"
                      href={assignment.URL}
                      rel="noreferrer"
                      target="_blank"
                      download
                    >
                      Open Assignment
                    </a>
                  )}
                </TableCell>
                <TableCell align="left">
                  <input
                    // className={classes.input}
                    // id="icon-button-file"
                    type="file"
                    onChange={ev => {
                      const id = userassignment.find(
                        userassign => userassign.assignmentId === assignment.id
                      ).id
                      handleUpload(ev, id)
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <a
                    className="link"
                    href={
                      userassignment.find(
                        userassign => userassign.assignmentId === assignment.id
                      ).submissionURL
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    {userassignment.find(
                      userassign => userassign.assignmentId === assignment.id
                    ).submissionURL
                      ? 'Assignment Link'
                      : ''}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

export default TableAssignments
