import React, {useState, Fragment} from 'react'
import MaterialTable from 'material-table'

const TeacherGrades = ({userassignments, course}) => {
  console.log(userassignments)
  //   if (assignment.length === 0) {
  //     return null
  //   }
  //console.log('in', assignment)

  const dataColunms = userassignments.map(assign => ({
    title: `Assignment ${assign.assignmentId}`,
    field: `${assign.assignmentId}`
  }))

  //   const dataAssign = assignment.map(assign => ({
  //     assignmentid: assign.id,
  //     assignment: assign.name,
  //     course: assign.courseId,
  //     category: assign.category,
  //     description: assign.description,
  //     teacher: assign.userId
  //   }))

  //console.log('process', dataAssign)

  const [state, setState] = useState({
    columns: dataColunms
    //       {title: 'Assignment ID', field: 'assignmentid'},
    //       {title: 'Assignment', field: 'assignment'},
    //       {title: 'Course', field: 'course'},
    //       {title: 'Category', field: 'category'},
    //       {title: 'Description', field: 'description'},
    //       {title: 'Teacher', field: 'teacher'}
    //     ],
    //     data: dataAssign
  })

  //console.log('statedata', state)

  return (
    <Fragment>
      <MaterialTable
        title={course.name}
        columns={state.columns}
        //   data={state.data}
        //   editable={{
        //     onRowAdd: newData =>
        //       new Promise(resolve => {
        //         setTimeout(() => {
        //           resolve()
        //           setState(prevState => {
        //             const data = [...prevState.data]
        //             data.push(newData)
        //             return {...prevState, data}
        //           })
        //         }, 600)
        //       }),
        //     onRowUpdate: (newData, oldData) =>
        //       new Promise(resolve => {
        //         setTimeout(() => {
        //           resolve()
        //           if (oldData) {
        //             setState(prevState => {
        //               const data = [...prevState.data]
        //               data[data.indexOf(oldData)] = newData
        //               return {...prevState, data}
        //             })
        //           }
        //         }, 600)
        //       }),
        //     onRowDelete: oldData =>
        //       new Promise(resolve => {
        //         setTimeout(() => {
        //           resolve()
        //           setState(prevState => {
        //             const data = [...prevState.data]
        //             data.splice(data.indexOf(oldData), 1)
        //             return {...prevState, data}
        //           })
        //         }, 600)
        //       })
        //   }}
      />
    </Fragment>
  )
}

export default TeacherGrades
