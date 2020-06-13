import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table'

const ManageAssignments = ({assignment, remove, course, save, load}) => {
  if (assignment.length === 0) {
    return null
  }
  console.log('assigns', assignment)
  //console.log(save)

  const dataAssign = assignment.map((assign, idx) => ({
    assignmentid: assign.id,
    assignNum: idx + 1,
    name: assign.name,
    courseId: assign.courseId,
    category: assign.category,
    description: assign.description,
    dueDate: assign.dueDate,
    userId: assign.userId
  }))
  console.log(dataAssign)

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
  // const [columns, setColumns] = useState (
  //   [
  //     {title: 'Assignment ID', field: 'assignmentid'},
  //     {title: 'Assignment#', field: 'assignNum'},
  //     {title: 'Assignment', field: 'name'},
  //     {title: 'Course', field: 'courseId'},
  //     {title: 'Category', field: 'category'},
  //     {title: 'Description', field: 'description'},
  //     {title: 'Due Date', field: 'dueDate'},
  //     {title: 'Teacher', field: 'userId'}
  //   ]
  // )
  // const [data, setData] = useState(
  //   dataAssign
  // )

  //useEffect( () => { dataAssign }, [ state.data ] );
  console.log('state', state)

  return (
    <MaterialTable
      title={`Manage Assignments (Course: ${course.name})`}
      style={{width: '80%', margin: 'auto'}}
      columns={state.columns}
      data={state.data}
      // columns={columns}
      // data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            console.log('newDate', newData)
            save(newData)
            resolve()
            // setState(prevState => {
            //   const data = [...prevState.data]
            //   data.push(newData)
            //   return {...prevState, data}
            // })
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
