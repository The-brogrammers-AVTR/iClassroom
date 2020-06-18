import React, {Component} from 'react'
import {connect} from 'react-redux'

class ReportCard extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(' ReportCard :', this.props)
    return <h1> Report Card</h1>
  }
}

const mapStateToProps = () => {}

export default connect(mapStateToProps)(ReportCard)
