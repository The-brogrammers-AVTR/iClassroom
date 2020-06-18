import React from 'react'
import MaterialTable from 'material-table'

const ManageAssignments = ({
  assignment,
  remove,
  course,
  save,
  load,
  create,
  students
}) => {
  if (assignment.length === 0) {
    return null
  }
  console.log('students', students)
  console.log('course', course)
  console.log('assignment', assignment)
  const data = assignment.map((assign, idx) => ({
    assignmentid: assign.id,
    assignNum: idx + 1,
    title: assign.title,
    courseId: assign.courseId,
    category: assign.category,
    description: assign.description,
    dueDate: assign.dueDate,
    userId: assign.userId
  }))
  //console.log('update', data)

  const columns = [
    {title: 'Assignment ID', field: 'assignmentid'},
    {title: 'Assignment#', field: 'assignNum'},
    {title: 'Assignment', field: 'title'},
    {title: 'Course', field: 'courseId'},
    {title: 'Category', field: 'category'},
    {title: 'Description', field: 'description'},
    {title: 'Teacher', field: 'userId'}
  ]

  const obj = {
    courseId: course.id,
    userId: students[0].id,
    userName: `${students[0].firstName} ${students[0].lastName}`,
    assignmentId: 7
  }

  const handleCreateUserassignments = () => {
    console.log('add userassignments')
    create(obj)
  }

  const handleAdd = async (newData, resolve) => {
    await save(newData)
    await handleCreateUserassignments()
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
            handleAdd(newData, resolve)
          }),

        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              // if (oldData) {
              //   setState(prevState => {
              //     const data = [...prevState.data]
              //     data[data.indexOf(oldData)] = newData
              //     return {...prevState, data}
              //   })
              // }
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              // setState(prevState => {
              //   const data = [...prevState.data]
              //   data.splice(data.indexOf(oldData), 1)
              //   return {...prevState, data}
              // })
            }, 600)
          })
      }}
    />
  )
}

export default ManageAssignments
