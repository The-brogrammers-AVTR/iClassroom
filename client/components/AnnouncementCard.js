import React from 'react'
import {connect} from 'react-redux'
import {removeAnnouncement} from '../store'
import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

class AnnouncementCard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {title, description, id} = this.props

    return (
      <div className="announcement-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon onClick={() => this.props.remove(id)} />
        </IconButton>
      </div>
    )
  }
}
const mapStateToProps = ({user}) => {
  return {user}
}

const mapDispatchToProps = dispatch => {
  return {
    remove: id => {
      dispatch(removeAnnouncement(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementCard)
