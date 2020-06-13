import React, {useState} from 'react'
import MaterialTable from 'material-table'

const ManageAssignments = ({assignment, remove, course, save}) => {
  if (assignment.length === 0) {
    return null
  }
  console.log(assignment)
  console.log(save)

  const dataAssign = assignment.map((assign, idx) => ({
    assignmentid: assign.id,
    assignNum: idx + 1,
    name: assign.name,
    courseId: assign.courseId,
    category: assign.category,
    description: assign.description,
    userId: assign.userId
  }))

  const [state, setState] = useState({
    columns: [
      {title: 'Assignment ID', field: 'assignmentid'},
      {title: 'Assignment#', field: 'assignNum'},
      {title: 'Assignment', field: 'name'},
      {title: 'Course', field: 'courseId'},
      {title: 'Category', field: 'category'},
      {title: 'Description', field: 'description'},
      {title: 'Teacher', field: 'userId'}
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
        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve()
        //       setState(prevState => {
        //         const data = [...prevState.data]
        //         data.push(newData)
        //         return {...prevState, data}
        //       })
        //     }, 600)
        //   }),
        onRowAdd: newData =>
          new Promise(resolve => {
            console.log(newData)
            save(newData)
            resolve()
            setState(prevState => {
              const data = [...prevState.data]
              data.push(newData)
              return {...prevState, data}
            })
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
