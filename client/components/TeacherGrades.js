import React, {useState, Fragment} from 'react'
import MaterialTable from 'material-table'

const TeacherGrades = ({userassignments, course, assignment}) => {
  //console.log('teacher u', userassignments)
  //console.log('teacher a', assignment)
  if (assignment.length === 0 || userassignments.length === 0) {
    return null
  }
  // const dataColunms = assignment.map((assign,idx) => ({
  //   title: `Assignment: ${assign.name}`,
  //   field: `assign${idx+1}`
  // }))
  //console.log('col', dataColunms)
  const dataUserassign = userassignments.map((userassign, idx) => ({
    studentid: userassign.userId,
    studentname: `${userassign.user.firstName} ${userassign.user.lastName}`,
    //userassignNum: idx+1,
    assignment: userassign.assignment.name,
    grade: userassign.grade
  }))
  //console.log('data', dataUserassign)

  const [state, setState] = useState({
    columns: [
      {title: 'Student ID', field: 'studentid'},
      {title: 'Student Name', field: 'studentname'},
      //{title: 'Assignment#', field: 'userassignNum'},
      {title: 'Assignment', field: 'assignment'},
      {title: 'Grade', field: 'grade'}
    ],
    data: dataUserassign
  })
  //console.log('statedata', state)
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
