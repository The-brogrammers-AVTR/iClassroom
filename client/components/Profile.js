import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateProfile} from '../store'

const Profile = ({user, update}) => {
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ''
  )
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : '')
  const [email, setEmail] = useState(user.email ? user.email : '')
  const [imageURL, setImageURL] = useState(user.imageURL ? user.imageURL : '')
  const [error, setError] = useState('')

  const onSubmit = ev => {
    ev.preventDefault()
    try {
      update(
        {
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          imageURL: imageURL
        },
        user.id,
        history.push
      )
    } catch (exception) {
      setError({error: exception.response.data.message})
    }
  }
  useEffect(
    () => {
      console.log(firstName, lastName, email, imageURL)
    },
    [firstName, lastName, email, imageURL]
  )

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
            onChange={event => setFirstName(event.target.value)}
          />
        </p>
        <p className="row">
          Last Name:
          <input
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />
        </p>
        <p className="row">
          Email:
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </p>
        <p className="row">
          imageURL:
          <input
            value={imageURL}
            onChange={event => setImageURL(event.target.value)}
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

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (user, id, push) => dispatch(updateProfile(user, id, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
