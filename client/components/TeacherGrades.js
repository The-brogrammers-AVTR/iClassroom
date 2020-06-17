import React, {useState, Fragment} from 'react'
import MaterialTable from 'material-table'

const TeacherGrades = ({userassignments, course, assignment, update, load}) => {
  console.log('teacher u', userassignments)
  console.log('teacher a', assignment)

  if (assignment.length === 0 || userassignments.length === 0) {
    return null
  }

  const data = userassignments.map(userassign => ({
    id: userassign.id,
    userId: userassign.userId,
    //studentname: `${userassign.user.firstName} ${userassign.user.lastName}`,
    studentname: userassign.userName,
    //assignment: userassign.assignment.name,
    assignment: assignment.find(assign => assign.id === userassign.assignmentId)
      .title,
    isComplete: userassign.isComplete ? 'Yes' : 'No',
    grade: userassign.grade ? userassign.grade : undefined
  }))

  //console.log('data', data)

  const columns = [
    {title: 'User Assignment ID', field: 'id'},
    {title: 'Student ID', field: 'userId'},
    {title: 'Student Name', field: 'studentname'},
    {title: 'Assignment', field: 'assignment'},
    {title: 'Complete', field: 'isComplete'},
    {title: 'Grade', field: 'grade'}
  ]

  const handleUpdate = async (newData, resolve) => {
    //console.log('in handle', newData)
    const id = newData.id
    const gradeObj = {grade: newData.grade}
    await update(id, gradeObj)
    resolve()
  }

  return (
    <Fragment>
      <MaterialTable
        title={`Grades (Course: ${course.name})`}
        style={{width: '80%', margin: 'auto'}}
        columns={columns}
        data={data}
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
          onRowUpdate: newData =>
            new Promise(resolve => {
              //console.log('in on', newData)
              handleUpdate(newData, resolve)
            })
          // onRowDelete: oldData =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve()
          //       setState(prevState => {
          //         const data = [...prevState.data]
          //         data.splice(data.indexOf(oldData), 1)
          //         return {...prevState, data}
          //       })
          //     }, 600)
          //   })
        }}
      />
    </Fragment>
  )
}

export default TeacherGrades
