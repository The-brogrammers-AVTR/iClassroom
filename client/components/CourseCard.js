import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProductCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {id, name} = this.props

    return (
      <li key={id} className="course-card">
        <p>{name}</p>
        <Link to={`/home/${id}`}>Enter Class</Link>
      </li>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(ProductCard)
