import React from 'react'
import {connect} from 'react-redux'

class AnnouncementCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {title, description} = this.props

    return (
      <div className="announcement-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    )
  }
}
const mapStateToProps = ({user}) => {
  return {user}
}

export default connect(mapStateToProps)(AnnouncementCard)
