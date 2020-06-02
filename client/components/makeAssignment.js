import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAssignment} from '../store/assignment'
const {apiKey1} = require('../../secrets.json')

class MakeAssignment extends Component {
  constructor() {
    super()
    this.state = {
      nasa: {}
    }
  }

  async componentDidMount() {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey1}`
    )
    const nasa = await res.json()

    if (nasa) {
      console.log(nasa)
      this.setState({nasa})
    }
  }

  render() {
    const {nasa} = this.state
    console.log(nasa)
    if (!nasa) {
      return <h1>loading</h1>
    }
    return (
      <div>
        <h1>make a new assignment</h1>
        <h2>{nasa.title}</h2>
        <img src={nasa.url} alt={nasa.title} />
        <p>{nasa.explanation}</p>
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
    create: () => {
      dispatch(createAssignment())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeAssignment)
