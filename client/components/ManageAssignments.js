import React, {useState} from 'react'
import MaterialTable from 'material-table'
import {storage} from '../firebase'
import {connect} from 'react-redux'
import {updateCourse, updateAssignment} from '../store'

const ManageAssignments = ({
  assignment,
  removeAssign,
  removeUserassign,
  course,
  save,
  updateAssign,
  create,
  students,
  allAssignments,
  allUserassignments,
  instructor
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
    // {title: 'Assignment ID', field: 'assignmentid', editable: 'never'},
    //{title: 'Assignment#', field: 'assignNum', editable: 'never'},
    {title: 'Assignment', field: 'title'},
    // {title: 'Course', field: 'courseId', initialEditValue: course.id},
    // {title: 'Category', field: 'category'},
    {title: 'Description', field: 'description'},
    {title: 'URL', field: 'URL', editable: 'never'},
    {title: 'Start Date', field: 'startDate'},
    {title: 'Due Date', field: 'endDate'}
    // {title: 'Teacher', field: 'userId', initialEditValue: instructor.id},
  ]

  const data = assignment.map((assign, idx) => ({
    assignmentid: assign.id,
    //assignNum: idx + 1,
    title: assign.title,
    courseId: assign.courseId,
    // category: assign.category,
    description: assign.description,
    URL: assign.URL ? (
      <a
        className="link"
        href={assign.URL}
        rel="noreferrer"
        target="_blank"
        download
      >
        Open Assignment
      </a>
    ) : (
      ''
    ),
    startDate: assign.startDate,
    endDate: assign.endDate,
    userId: assign.userId
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

  const handleUpload = (e, id) => {
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
              updateAssign(
                {
                  URL: url
                },
                id
              )
            })
        }
      )
    }
  }

  const handleAdd = async (newData, resolve, callback) => {
    await save(newData)
    setTimeout(function() {
      console.log('in handleAdd', newData)
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
        detailPanel={[
          {
            icon: 'attachment',
            tooltip: 'Add attachment',
            // eslint-disable-next-line react/display-name
            render: rowData => {
              console.log(rowData)
              return (
                <div>
                  <input
                    // className={classes.input}
                    // id="icon-button-file"
                    type="file"
                    onChange={e => {
                      handleUpload(e, rowData.assignmentid)
                    }}
                  />
                </div>
              )
            }
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              const updatedData = {
                ...newData,
                courseId: course.id,
                userId: instructor.id
              }
              handleAdd(updatedData, resolve, handleCreateUserassignments)
            }),

          onRowDelete: oldData =>
            new Promise(resolve => {
              handleDelete(oldData, resolve)
            })
        }}
        options={{
          actionsColumnIndex: -1
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
    updateAssign: (assignment, id) => dispatch(updateAssignment(assignment, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAssignments)
