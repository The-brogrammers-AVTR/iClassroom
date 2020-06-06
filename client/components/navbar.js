import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div className="nav-wrapper">
    <h1>
      <Link to="/" className="logo-name">
        iClassroom
      </Link>
    </h1>
    {/* <img src={logo} /> */}
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div className="row">
            <Link to="/profile">
              <img className="navbar-pfp" src={user.imageURL} alt="pfp" />
            </Link>
            <p>Hello, {user.firstName}</p>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/course">Course</Link>
        </div>
      )}
    </nav>
  </div>
)

const mapState = ({user}) => {
  return {
    isLoggedIn: !!user.id,
    user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
