import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar.js'

class CourseHome extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {courses, user} = this.props

    return (
      <div className="course-home-wrapper">
        <Sidebar />
        <div className="course-content">
          <h1>Content Goes Here</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, user}) => {
  return {courses, user}
}

export default connect(mapStateToProps)(CourseHome)
