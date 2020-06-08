import React from 'react'
import {connect} from 'react-redux'
import {createAnnouncement} from '../store/announcement'

class CreateAnnouncement extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    const {id, push} = this.props
    console.log({courseId: id})
    this.props.post(
      {
        title: this.state.title,
        description: this.state.description,
        courseId: id
      },
      push,
      id
    )
  }

  render() {
    const {title, description} = this.state
    const {id} = this.props
    console.log({courseId: id})
    return (
      <div className="form-wrapper">
        <form className="new-form" onSubmit={this.onSubmit}>
          <p className="row">
            Title:
            <input
              value={title}
              onChange={ev => this.setState({title: ev.target.value})}
            />
          </p>
          <p className="row">
            Description:
            <input
              value={description}
              onChange={ev => this.setState({description: ev.target.value})}
            />
          </p>

          <button type="submit" disabled={!title || !description}>
            Post
          </button>
        </form>
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProducts = dispatch => {
  return {
    post: (announcement, push, id) =>
      dispatch(createAnnouncement(announcement, push, id))
  }
}

export default connect(mapStatetoProps, mapDispatchToProducts)(
  CreateAnnouncement
)
