import React, {useState, Fragment} from 'react'
import MaterialTable from 'material-table'

const TeacherGrades = ({userassignments, course, assignment}) => {
  console.log('teacher u', userassignments)
  console.log('teacher a', assignment)
  if (assignment.length === 0 || userassignments.length === 0) {
    return null
  }
  const dataColunms = assignment.map(assign => ({
    title: `Assignment ${assign.id} (${assign.name})`,
    field: `assign${assign.id}`
  }))
  console.log('col', dataColunms)
  // const dataUserassign = assignment.map(assign => ({
  //   assignmentid: assign.id,
  //   assignment: assign.name,
  //   course: assign.courseId,
  //   category: assign.category,
  //   description: assign.description,
  //   teacher: assign.userId
  // }))

  const dataUserassign = [
    {
      studentid: 1,
      studentname: 'Robert',
      assign1: 60,
      assign2: 70,
      assign3: 80
    }
  ]
  console.log('data', dataUserassign)

  const [state, setState] = useState({
    columns: [
      {title: 'Student ID', field: 'studentid'},
      {title: 'Student Name', field: 'studentname'},
      ...dataColunms
    ],
    data: dataUserassign
  })
  console.log('statedata', state)
  return (
    <Fragment>
      <MaterialTable
        title={`Grades (Course: ${course.name})`}
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
    </Fragment>
  )
}

export default TeacherGrades
