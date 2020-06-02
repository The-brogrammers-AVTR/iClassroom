import React, {Component} from 'react'
import {connect} from 'react-redux'
import {readAssignments} from '../store/assignment'
import {deleteAssignment} from '../store/assignment'

class Assignments extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    const {remove} = this.props
    console.log(remove)
    if (!this.props.assignment) {
      return null
    }
    return (
      <ul>
        {this.props.assignment.map(assignment => (
          <li key={assignment.id}>
            <span>{assignment.name}</span>
            <span>{assignment.category}</span>
            <span>{assignment.description}</span>
            <span>{assignment.teacherId}</span>
            <button>Edit</button>
            <button onClick={() => remove(assignment.id)}>Remove</button>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = ({assignment}) => {
  if (!assignment) {
    return {}
  }
  return {
    assignment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(readAssignments())
    },
    remove: id => {
      dispatch(deleteAssignment(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
