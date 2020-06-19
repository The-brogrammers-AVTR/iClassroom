import React, {Component} from 'react'
import {connect} from 'react-redux'

class ReportCard extends Component {
  render() {
    const {user, courses, userassignment} = this.props

    const allAssignments = userassignment.filter(ua => user.id === ua.userId)

    let gradedAssignments
    if (allAssignments.length) {
      gradedAssignments = allAssignments.filter(aa => aa.isComplete === true)
    }
    console.log(userassignment, allAssignments, gradedAssignments)

    let courseGrade = [],
      index = 0
    if (allAssignments.length) {
      courseGrade = allAssignments.reduce(
        (acc, item) => {
          if (acc[index].courseId === item.courseId) {
            console.log(
              'if',
              acc[index].courseId,
              acc[index].grade,
              item.courseId
            )
            acc[index].assignCount += 1
            if (item.isComplete) {
              acc[index].grade += parseInt(item.grade)
            }
            console.log(acc)
          } else {
            console.log('else', item.courseId)
            acc.push({
              courseId: item.courseId,
              grade: parseInt(item.grade),
              assignCount: 1
            })
            console.log(acc)
            index++
          }
          return acc
        },
        [{courseId: 1, grade: 0, assignCount: 0}]
      )
      console.log('finally courseGrade', courseGrade)
      //remove 1st element if its null or 0 inserted by default above
      if (courseGrade[0].grade === 0 || ourseGrade[0].grade === null) {
        courseGrade.splice(0, 1)
      }

      console.log('-Course Grades-after removing null grades-', courseGrade)
      console.log('Graded Assignments: ', gradedAssignments)

      console.log(' ReportCard :', this.props)
      return (
        <div>
          <h1> Student Report Card</h1>
          <h2> Course | Grade </h2>
          <ul>
            {courseGrade.map((cg, idx) => {
              console.log(cg)
              console.log('inside map')
              const foundCourse = courses.find(
                course => course.id === cg.courseId
              )
              let grade = Math.round(cg.grade / cg.assignCount, 2)
              console.log(grade)
              return (
                <li key={idx}>
                  {foundCourse.name} &nbsp;&nbsp;&nbsp;{grade}
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }
}

const mapStateToProps = ({user, courses, userassignment}) => {
  return {user, courses, userassignment}
}

export default connect(mapStateToProps)(ReportCard)
