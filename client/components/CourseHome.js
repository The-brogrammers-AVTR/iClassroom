import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CourseHome extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {courses, user} = this.props
    // let filteredProducts
    // if (category !== 'all') {
    //   filteredProducts = products.filter(
    //     (product) => product.category === category
    //   )
    // } else {
    //   filteredProducts = products
    // }

    return (
      <div className="course-home-wrapper">
        <div className="course-sidebar">
          <div className="course-info">
            <p>Course Name</p>
            <p>Course Code</p>
            <p>Instructor Name</p>
            <p>Contact Info</p>
            <p>Syllabus Link</p>
          </div>
          <div className="course-navigation">
            {user.isTeacher === true && <button>Students</button>}
            <button>Announcements</button>
            <button>Lessons</button>
            <button>Assignments</button>
            <button>Grades</button>
            <button>Video Call</button>
            <Link to="/home"> Back to Courses</Link>
          </div>
        </div>
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
