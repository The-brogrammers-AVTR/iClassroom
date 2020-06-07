import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateProfile} from '../store'

class Profile extends Component {
  constructor(props) {
    let firstName = ''
    let lastName = ''
    let email = ''
    let imageURL = ''
    if (props.user) {
      if (props.user.firstName) {
        firstName = props.user.firstName
      }
      if (props.user.lastName) {
        lastName = props.user.lastName
      }
      if (props.user.email) {
        email = props.user.email
      }
      if (props.user.imageURL) {
        imageURL = props.user.imageURL
      }
    }
    super()
    this.state = {
      firstName,
      lastName,
      email,
      imageURL,
      error: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    try {
      this.props.update(
        {
          id: this.props.user.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          imageURL: this.state.imageURL
        },
        this.props.history.push
      )
    } catch (exception) {
      this.setState({error: exception.response.data.message})
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user.firstName !== this.props.user.firstName) {
      this.setState({firstName: this.props.user.firstName})
    }
    if (prevProps.user.lastName !== this.props.user.lastName) {
      this.setState({lastName: this.props.user.lastName})
    }
    if (prevProps.user.email !== this.props.user.email) {
      this.setState({email: this.props.user.email})
    }
    if (prevProps.user.imageURL !== this.props.user.imageURL) {
      this.setState({imageURL: this.props.user.imageURL})
    }
  }

  render() {
    const {onSubmit} = this
    const {user} = this.props
    const {firstName, lastName, email, imageURL} = this.state
    return (
      <div>
        <div>
          <h3>User Profile</h3>
          <img src={imageURL} />
        </div>
        <div>
          <p className="row">
            First Name:
            <input
              value={firstName}
              onChange={event => this.setState({firstName: event.target.value})}
            />
          </p>
          <p className="row">
            Last Name:
            <input
              value={lastName}
              onChange={event => this.setState({lastName: event.target.value})}
            />
          </p>
          <p className="row">
            Email:
            <input
              value={email}
              onChange={event => this.setState({email: event.target.value})}
            />
          </p>
          <p className="row">
            imageURL:
            <input
              value={imageURL}
              onChange={event => this.setState({imageURL: event.target.value})}
            />
          </p>
          <button
            type="submit"
            onClick={onSubmit}
            disabled={
              firstName === user.firstName &&
              lastName === user.lastName &&
              email === user.email &&
              imageURL === user.imageURL
            }
          >
            Update Profile
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (user, push) => dispatch(updateProfile(user, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
