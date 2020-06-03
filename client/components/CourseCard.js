import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import queryString from 'query-string'

class ProductCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {id, name, user} = this.props
    console.log(id, name, user)
    return (
      <li key={id} className="course-card">
        <h2>{name} - #### </h2>
        <h4> Course Instructor </h4>
        <Link
          to={`/course/${id}/announcements?userName=${user.email}&room=${name}`}
        >
          Enter Class
        </Link>
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

export default connect(mapStateToProps)(ProductCard)
