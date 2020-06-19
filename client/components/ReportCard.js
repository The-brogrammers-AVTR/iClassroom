import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {readUserassignment, getCourses, getDetails} from '../store'

class ReportCard extends Component {
  /* constructor() {
    super()
    this.state={
        assignments:[],

    }
  }
  async componentDidMount (){
    //const userId= this.props.user.id;
    const {user,courses}=this.props;
    const assignments=(await axios.get(`/api/userassignments/${user.id}`)).data
    console.log(assignments)
    if (assignments.length){
        const completedAssignments = assignments.filter(ua=>ua.isComplete===true)
        const assignmentPerSubj= assignments.reduce((acc,item)=>{
            console.log(item.courseId)
            
            acc[item.courseId]=acc[item.courseId] || 0;
            
            acc[item.courseId]=acc[item.courseId] + 1;
            
            return acc;
             
        },{})  
        console.log('Assignment count per subject',assignmentPerSubj);                        
        console.log('completed Assignments:',completedAssignments)
        //const courseDetails=courses.find(course=>course.id===completedAssignments[0].courseId)

        //console.log('Course Details:',courseDetails)

        this.setState({assignments:completedAssignments})
    }

} */
  render() {
    // const {assignments}=this.state;
    const {user, courses, userassignment, assignment} = this.props

    const allAssignments = userassignment.filter(ua => user.id === ua.userId)

    let gradedAssignments
    if (allAssignments.length) {
      gradedAssignments = allAssignments.filter(aa => aa.isComplete === true)
    }
    console.log(userassignment, allAssignments, gradedAssignments)

    let courseGrade = {}
    if (allAssignments.length) {
      courseGrade = allAssignments.reduce((acc, item) => {
        if (acc[item.courseId]) {
          acc[item.courseId] += item.grade * 1
        } else {
          acc[item.courseId] = item.grade * 1
        }
        return acc
      }, {})
    }
    console.log('-Course Grades--', courseGrade)

    console.log('Graded Assignments: ', gradedAssignments)

    console.log(' ReportCard :', this.props)

    return (
      <div>
        <h1> Student Report Card</h1>
        <h2> Course | Grade </h2>
      </div>
    )
  }
}

const mapStateToProps = ({user, courses, userassignment}) => {
  return {user, courses, userassignment}
}

export default connect(mapStateToProps)(ReportCard)
