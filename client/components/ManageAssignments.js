import React, {useState} from 'react'
import MaterialTable from 'material-table'

const ManageAssignments = ({assignment, remove, course}) => {
  //const classes = useStyles()
  if (assignment.length === 0) {
    return null
  }

  const dataAssign = assignment.map(assign => ({
    assignmentid: assign.id,
    assignment: assign.name,
    course: assign.courseId,
    category: assign.category,
    description: assign.description,
    teacher: assign.userId
  }))

  const [state, setState] = useState({
    columns: [
      {title: 'Assignment ID', field: 'assignmentid'},
      {title: 'Assignment', field: 'assignment'},
      {title: 'Course', field: 'course'},
      {title: 'Category', field: 'category'},
      {title: 'Description', field: 'description'},
      {title: 'Teacher', field: 'teacher'}
    ],
    data: dataAssign
  })

  return (
    <MaterialTable
      title={`Manage Assignments (Course: ${course.name})`}
      style={{width: '80%', margin: 'auto'}}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              setState(prevState => {
                const data = [...prevState.data]
                data.push(newData)
                return {...prevState, data}
              })
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data]
                  data[data.indexOf(oldData)] = newData
                  return {...prevState, data}
                })
              }
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
              setState(prevState => {
                const data = [...prevState.data]
                data.splice(data.indexOf(oldData), 1)
                return {...prevState, data}
              })
            }, 600)
          })
      }}
    />
  )
}

export default ManageAssignments
