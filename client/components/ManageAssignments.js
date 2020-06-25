import React, {useState} from 'react'
import MaterialTable from 'material-table'
import {storage} from '../firebase'
import {connect} from 'react-redux'
import {updateCourse} from '../store'

const ManageAssignments = ({
  assignment,
  removeAssign,
  removeUserassign,
  course,
  save,

  create,
  students,
  allAssignments,
  allUserassignments
}) => {
  if (assignment.length === 0) {
    return null
  }

  const [_url, setUrl] = useState(assignment.URL ? assignment.URL : '')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  console.log('allAssign', allAssignments)
  console.log('allUserassign', allUserassignments)

  const columns = [
    {title: 'Assignment', field: 'title'},
    {title: 'Description', field: 'description'},
    {title: 'URL', field: 'URL'},
    {title: 'Start Date', field: 'startDate'},
    {title: 'Due Date', field: 'endDate'}
  ]

  const data = assignment.map((assign, idx) => ({
    // assignmentid: assign.id,
    title: assign.title,
    description: assign.description,
    URL: assign.URL,
    startDate: assign.startDate,
    endDate: assign.endDate
  }))

  // const newAssignmentID = Math.max(...allAssignments.map(assign => assign.id))
  const newAssignmentID = allAssignments.length + 1
  const handleCreateUserassignments = students => {
    students.forEach(student => {
      create({
        courseId: course.id,
        userId: student.id,
        userName: `${student.firstName} ${student.lastName}`,
        assignmentId: newAssignmentID
      })
    })
  }

  const handleDeleteAssignment = assignid => {
    setTimeout(function() {
      removeAssign(assignid)
    }, 500)
  }

  const handleDeleteUserassignments = (assignid, callback) => {
    allUserassignments.forEach(userassign => {
      if (userassign.assignmentId === assignid) {
        //console.log(userassign.id)
        removeUserassign(userassign.id)
      }
    })
    callback(assignid)
  }

  const handleUpload = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0]

      const uploadTask = storage.ref(`assignments/${file.name}`).put(file)
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
            .ref('assignments')
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              update(
                {
                  URL: url
                },
                assignment.id,
                history.push
              )
            })
        }
      )
    }
  }

  const handleAdd = async (newData, resolve, callback) => {
    await save(newData)
    setTimeout(function() {
      //console.log('in handleAdd', newAssignmentID)
      callback(students)
    }, 500)
    resolve()
  }

  const handleDelete = async (oldData, resolve) => {
    await handleDeleteUserassignments(
      oldData.assignmentid,
      handleDeleteAssignment
    )
    resolve()
  }

  return (
    <div>
      <h1>Assignments</h1>
      <MaterialTable
        title={`Manage Assignments (Course: ${course.name})`}
        style={{marginLeft: '5%', padding: '2%'}}
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'attachment',
            tooltip: 'Add attachment',
            onClick: (event, rowData) => alert('You saved ' + rowData.name),
            render: rowData => {
              return (
                <div>
                  <input
                    // className={classes.input}
                    // id="icon-button-file"
                    type="file"
                    onChange={handleUpload}
                  />
                  rowData
                </div>
              )
            }
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              handleAdd(newData, resolve, handleCreateUserassignments)
            }),
          // onRowUpdate: (newData, oldData) =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve()
          //       if (oldData) {
          //         setState(prevState => {
          //           const data = [...prevState.data]
          //           data[data.indexOf(oldData)] = newData
          //           return {...prevState, data}
          //         })
          //       }
          //     }, 600)
          //   }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              handleDelete(oldData, resolve)
            })
        }}
      />
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return {user}
}

const mapDispatchToProps = dispatch => {
  return {
    update: (course, id, push) => dispatch(updateCourse(course, id, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAssignments)
