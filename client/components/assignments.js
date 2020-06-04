import React, {Component} from 'react'
import {connect} from 'react-redux'
import {readAssignments} from '../store/assignment'
import {deleteAssignment} from '../store/assignment'
import TableAssignments from './TableAssignments'

class Assignments extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    const {remove} = this.props
    if (!this.props.assignment) {
      return null
    }
    return (
      <div>
        <TableAssignments assignment={this.props.assignment} remove={remove} />
      </div>
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
