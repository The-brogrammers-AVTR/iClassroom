import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

class CourseCard extends React.Component {
  constructor() {
    super()
    this.state = {
      instructors: []
    }
  }

  async componentDidMount() {
    const {UserCourses} = this.props
    await axios.get('/api/users').then(response => {
      const teachers = response.data.filter(user => user.isTeacher === true)
      const instructors = teachers.filter(teacher =>
        UserCourses.find(usercourse => usercourse.userId === teacher.id)
      )
      this.setState({instructors})
    })
  }

  render() {
    const {instructors} = this.state
    const {id, name, code} = this.props

    if (!instructors) {
      return null
    }
    return (
      <li key={id} className="course-card">
        <h2>
          {name} - {code}
        </h2>
        {instructors.map(instructor => (
          <h4 key={instructor.id}>Instructor: {instructor.firstName}</h4>
        ))}
        <Link to={`/course/${id}/announcements`}>Enter Class</Link>
        <br />
        <button> Edit Course </button>
      </li>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(CourseCard)
