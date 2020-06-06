import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import {logo} from '../../images/iClassroom.png'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="nav-wrapper">
    <h1>
      <Link to="/">iClassroom</Link>
    </h1>
    {/* <img src={logo} /> */}
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
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

// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import useScrollTrigger from '@material-ui/core/useScrollTrigger'
// import {ThemeProvider} from '@material-ui/styles'
// import theme from "./Theme"

// function ElevationScroll(props) {
//   const {children} = props
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0
//   })

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0
//   })
// }

// const Navbar = ({handleClick, isLoggedIn}) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <ElevationScroll>
//         <AppBar position="fixed">
//           <Toolbar>iClassroom</Toolbar>
//         </AppBar>
//       </ElevationScroll>
//     </ThemeProvider>
//   )
// }

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
