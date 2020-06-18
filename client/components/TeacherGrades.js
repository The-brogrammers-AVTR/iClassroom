import React, {useState, Fragment} from 'react'
import MaterialTable from 'material-table'

const TeacherGrades = ({userassignments, course, assignment, update, load}) => {
  //console.log('teacher u', userassignments)
  //console.log('teacher a', assignment)

  if (assignment.length === 0 || userassignments.length === 0) {
    return null
  }

  const data = userassignments.map(userassign => ({
    id: userassign.id,
    userId: userassign.userId,
    studentname: userassign.userName,
    assignment: assignment.find(assign => assign.id === userassign.assignmentId)
      .title,
    isComplete: userassign.isComplete ? 'Yes' : 'No',
    grade: userassign.grade ? userassign.grade : undefined
  }))

  const columns = [
    {title: 'User Assignment ID', field: 'id'},
    {title: 'Student ID', field: 'userId'},
    {title: 'Student Name', field: 'studentname'},
    {title: 'Assignment', field: 'assignment'},
    {title: 'Complete', field: 'isComplete'},
    {title: 'Grade', field: 'grade'}
  ]

  const handleUpdate = async (newData, resolve) => {
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
          onRowUpdate: newData =>
            new Promise(resolve => {
              handleUpdate(newData, resolve)
            })
        }}
      />
    </Fragment>
  )
}

export default TeacherGrades
