import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

// class Sidebar extends React.Component {
//   constructor() {
//     super()
//   }

//   render() {
//     const {id, name, code, user, instructor} = this.props
//     console.log(instructor, name, user)
//     return (
//       <div className="course-sidebar">
//         <div className="course-info">
//           <p>
//             {name} - {code}
//           </p>
//           <p>
//             {instructor.firstName} {instructor.lastName}
//           </p>
//           <p>{instructor.email}</p>
//           <p>Syllabus Link</p>
//         </div>
//         <div className="course-navigation">
//           {user.isTeacher === true && (
//             <Link to={`/course/${id}/students`}>Students</Link>
//           )}
//           <Link to={`/course/${id}/announcements`}>Announcements</Link>
//           <Link to={`/course/${id}/lessons`}>Lessons</Link>
//           <Link to={`/course/${id}/assignments`}>Assignments</Link>
//           <Link to={`/course/${id}/grades`}>Grades</Link>
//           <Link to={`/course/${id}/canvas`}>White Board</Link>
//           <Link
//             to={`/course/${id}/chatroom?userName=${user.firstName}&room=${name}`}
//           >
//             Chat Room
//           </Link>
//           <Link to="/"> Back to Courses</Link>
//         </div>
//       </div>
//     )
//   }
// }

import clsx from 'clsx'
import {makeStyles, useTheme, ThemeProvider} from '@material-ui/core/styles'
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import AnnouncementIcon from '@material-ui/icons/Announcement' //announcement
import EventNoteIcon from '@material-ui/icons/EventNote' //lessons
import AssessmentIcon from '@material-ui/icons/Assessment' //student GPA
import AssignmentIcon from '@material-ui/icons/Assignment' //assignment
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd' //grade
import CallIcon from '@material-ui/icons/Call' //videocall
import VideocamIcon from '@material-ui/icons/Videocam' //videocall
import ChatIcon from '@material-ui/icons/Chat' //chat
import CastIcon from '@material-ui/icons/Cast' //broadcast
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo' //broadcast
import GroupIcon from '@material-ui/icons/Group' //groupwork
import HelpIcon from '@material-ui/icons/Help' //help

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))
const Sidebar = ({id, name, code, user, instructor}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {name} - {code}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <AnnouncementIcon />
              </ListItemIcon>
              <ListItemText> Announcements </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user}) => {
  return {user}
}

export default connect(mapStateToProps)(Sidebar)
