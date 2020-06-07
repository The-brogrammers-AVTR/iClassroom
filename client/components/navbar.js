import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// const Navbar = ({handleClick, isLoggedIn, user}) => (
//   <div className="nav-wrapper">
//     <h1>
//       <Link to="/">
//         <img className="logo-name" src="images/iClassroom.png" alt="logo" />
//       </Link>
//     </h1>

//     <nav className="navbar">
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <div className="row">
//             <Link to="/profile">
//               <img className="navbar-pfp" src={user.imageURL} alt="pfp" />
//             </Link>
//             <p>Hello, {user.firstName}</p>
//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//           </div>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/course">Course</Link>
//         </div>
//       )}
//     </nav>
//   </div>
// )

import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  makeStyles,
  Typography,
  Grid,
  Avatar,
  Button
} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Theme'

const useStyles = makeStyles({
  menuButton: {
    margin: '1rem'
  }
})

function ElevationScroll(props) {
  const {children} = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <ElevationScroll>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Link to="/">
              <img
                className="logo-name"
                src="images/iClassroom.png"
                alt="logo"
              />
            </Link>
            {isLoggedIn ? (
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Link to="/profile">
                  <Avatar alt="pfp" src={user.imageURL} />
                </Link>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.menuButton}
                >
                  {`Hello, ${user.firstName}`}
                </Typography>
                <Typography variant="h6" color="primary" onClick={handleClick}>
                  <Button color="primary">Logout</Button>
                </Typography>
              </Grid>
            ) : (
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Typography variant="h6" className={classes.menuButton}>
                  <Link to="/login">
                    <Button color="primary">Login</Button>
                  </Link>
                </Typography>

                <Typography variant="h6" className={classes.menuButton}>
                  <Link to="/signup">
                    <Button color="primary">Sign Up</Button>
                  </Link>
                </Typography>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </ThemeProvider>
  )
}

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
