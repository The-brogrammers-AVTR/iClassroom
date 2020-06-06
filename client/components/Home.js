import React from 'react'
import {connect} from 'react-redux'
import MyCourses from './MyCourses'
import FindCourses from './FindCourses'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      active: true
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const {active} = this.state
    this.setState({
      active: !active
    })
  }

  render() {
    const {active} = this.state
    const {user} = this.props

    return (
      <div>
        <div className="button-wrapper">
          <button
            type="button"
            className="default-button"
            onClick={this.onClick}
          >
            {active ? 'Find Courses' : 'MyCourses'}
          </button>
          {/* {!user.isTeacher && (
          <button onClick={this.onClick} type="button">
            Find Courses
          </button>
        )} */}
          <button
            type="button"
            className="default-button"
            onClick={this.onClickTwo}
          >
            Course Calendar
          </button>
          <button
            type="button"
            className="default-button"
            onClick={this.onClickTwo}
          >
            Report Card
          </button>
        </div>
        {active ? <MyCourses /> : <FindCourses />}
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {user}
}

export default connect(mapStateToProps)(Home)
