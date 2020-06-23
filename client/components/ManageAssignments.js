import React from 'react'
import MaterialTable from 'material-table'

const ManageAssignments = ({
  assignment,
  removeAssign,
  removeUserassign,
  course,
  save,
  create,
  students,
  allAssignments,
  instructor,
  allUserassignments
}) => {
  if (assignment.length === 0) {
    return null
  }
  console.log('allAssign', allAssignments)
  console.log('allUserassign', allUserassignments)
  const data = assignment.map((assign, idx) => ({
    assignmentid: assign.id,
    //assignNum: idx + 1,
    title: assign.title,
    courseId: assign.courseId,
    category: assign.category,
    description: assign.description,
    startDate: assign.startDate,
    endDate: assign.endDate,
    userId: assign.userId
  }))

  const columns = [
    // {title: 'Assignment ID', field: 'assignmentid', editable: 'never'},
    //{title: 'Assignment#', field: 'assignNum', editable: 'never'},
    {title: 'Assignment', field: 'title'},
    {title: 'Course', field: 'courseId', initialEditValue: course.id},
    {title: 'Category', field: 'category'},
    {title: 'Description', field: 'description'},
    {title: 'Start Date', field: 'startDate'},
    {title: 'Due Date', field: 'endDate'},
    {title: 'Teacher', field: 'userId', initialEditValue: instructor.id}
  ]

  // const newAssignmentID = Math.max(...allAssignments.map(assign => assign.id))
  // console.log('new ass id', newAssignmentID)
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
    <MaterialTable
      title={`Manage Assignments (Course: ${course.name})`}
      style={{width: '80%', margin: 'auto'}}
      columns={columns}
      data={data}
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
  )
}

export default ManageAssignments
