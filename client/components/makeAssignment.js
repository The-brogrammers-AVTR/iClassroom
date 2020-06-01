import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAssignment} from '../store/assignment'
//const {REACT_APP_NASA_KEY} = require('../../secrets.js')
//import {REACT_APP_NASA_KEY} from '../../secrets'
//console.log(REACT_APP_NASA_KEY);
//const apiKey = process.env.REACT_APP_NASA_KEY
const {apiKey1} = require('../../secrets.json')
console.log(apiKey1)

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
      //`https://api.nasa.gov/planetary/apod?api_key=lmbimaGejOOMZ3XwKkgRoqCJXKG2aoxles68Jv5U`
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
