import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
//import {logo} from '../../images/iClassroom.png'

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

// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import useScrollTrigger from '@material-ui/core/useScrollTrigger'
// import {ThemeProvider} from '@material-ui/styles'
// import theme from './Theme'
// import {makeStyles} from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'

// const useStyles = makeStyles({
//   title: {
//     margin: '1rem',
//     fontWeight: 'bold',
//     flexGrow: 1
//   },
//   menu: {
//     cursor: 'pointer',
//     margin: '1rem'
//   }
// })

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

// const Navbar = ({handleClick, isLoggedIn, user}) => {
//   const classes = useStyles()
//   return (
//     <ThemeProvider theme={theme}>
//       <ElevationScroll>
//         <AppBar position="fixed" color="primary">
//           {isLoggedIn ? (
//             <Toolbar>
//               <Typography
//                 variant="h4"
//                 color="secondary"
//                 className={classes.title}
//               >
//                 <Link to="/">iClassroom</Link>
//               </Typography>
//               <Typography
//                 variant="h6"
//                 color="secondary"
//                 className={classes.menu}
//               >
//                 {`Hello, ${user.firstName}`}
//               </Typography>
//               <Typography
//                 variant="h6"
//                 color="secondary"
//                 className={classes.menu}
//                 onClick={handleClick}
//               >
//                 Logout
//               </Typography>
//             </Toolbar>
//           ) : (
//             <Toolbar>
//               <Typography
//                 variant="h4"
//                 color="secondary"
//                 className={classes.title}
//               >
//                 <Link to="/">iClassroom</Link>
//               </Typography>
//               <Typography
//                 variant="h6"
//                 color="secondary"
//                 className={classes.menu}
//               >
//                 <Link to="/login">Login</Link>
//               </Typography>
//               <Typography
//                 variant="h6"
//                 color="secondary"
//                 className={classes.menu}
//               >
//                 <Link to="/signup">Sign Up</Link>
//               </Typography>
//               <Typography
//                 variant="h6"
//                 color="secondary"
//                 className={classes.menu}
//               >
//                 <Link to="/course">Course</Link>
//               </Typography>
//             </Toolbar>
//           )}
//         </AppBar>
//       </ElevationScroll>
//     </ThemeProvider>
//   )
// }

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
