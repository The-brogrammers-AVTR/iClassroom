import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateCourse} from '../store'
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import {storage} from '../firebase'
import theme from './Theme'
import clsx from 'clsx'
import {
  Drawer,
  AppBar,
  Grid,
  Toolbar,
  Tooltip,
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

import ContactMailIcon from '@material-ui/icons/ContactMail' //Contact
import AttachmentIcon from '@material-ui/icons/Attachment' //Syllabus
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar' //Students
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive' //Announcement
import SchoolIcon from '@material-ui/icons/School' //Lessons
import AssignmentIcon from '@material-ui/icons/Assignment' //Assignment
import ExtensionIcon from '@material-ui/icons/Extension' //Tests
import AssessmentIcon from '@material-ui/icons/Assessment' //Grades
import CastConnectedIcon from '@material-ui/icons/CastConnected' //Classroom
import ExitToAppIcon from '@material-ui/icons/ExitToApp' //Exit

const drawerWidth = 240

const useStyles = makeStyles({
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
    backgroundColor: theme.palette.secondary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8)
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  input: {
    display: 'none'
  },
  noPadding: {
    padding: 0
  }
})

const Sidebar = ({
  id,
  name,
  code,
  syllabus,
  user,
  instructor,
  update,
  assignment
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [syllabusFile, setSyllabusFile] = useState(syllabus ? syllabus : '')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const handleUpload = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0]

      const uploadTask = storage.ref(`files/${file.name}`).put(file)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          )
          setProgress(progress)
        },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref('files')
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              update(
                {
                  syllabus: url
                },
                id,
                history.push
              )
            })
        }
      )
    }
  }

  useEffect(() => {
    console.log(syllabus)
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const assignmentId = assignment.find(as => as.title.toLowerCase() === 'test')

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
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography variant="h6">
                {name} - {code}
              </Typography>

              <Link to="/">
                <Tooltip title="Return to Course Home">
                  <IconButton>
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>
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
            <ListItem>
              <Tooltip title="Contact Info">
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText>
                {instructor.firstName} {instructor.lastName}
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon />
              <ListItemText> {instructor.email} </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon />
              <ListItemText>
                <div className="row">
                  <a
                    href={syllabusFile}
                    rel="noreferrer"
                    target="_blank"
                    download
                  >
                    Syllabus
                  </a>
                  {user.isTeacher === true && (
                    <div className="row">
                      <input
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={handleUpload}
                      />
                      <label htmlFor="icon-button-file">
                        <Tooltip title="Add attachment">
                          <IconButton component="span" color="primary">
                            <AttachmentIcon />
                          </IconButton>
                        </Tooltip>
                      </label>
                    </div>
                  )}
                </div>
              </ListItemText>
            </ListItem>
            {/* 
            <ListItem className={classes.noPadding}>
              <ListItemIcon />
              <ListItemText>
                <progress value={progress} max="100" />
              </ListItemText>
            </ListItem> */}

            <Divider />
            {user.isTeacher === true && (
              <Link to={`/course/${id}/students`}>
                <ListItem button>
                  <Tooltip title="Students">
                    <ListItemIcon>
                      <PermContactCalendarIcon />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText> Students </ListItemText>
                </ListItem>
              </Link>
            )}

            <Link to={`/course/${id}/announcements`}>
              <ListItem button>
                <Tooltip title="Announcements">
                  <ListItemIcon>
                    <NotificationsActiveIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText> Announcements </ListItemText>
              </ListItem>
            </Link>

            <Link to={`/course/${id}/lessons`}>
              <ListItem button>
                <Tooltip title="Lessons">
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText> Lessons </ListItemText>
              </ListItem>
            </Link>

            <Link to={`/course/${id}/assignments`}>
              <ListItem button>
                <Tooltip title="Assignments">
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText> Assignments </ListItemText>
              </ListItem>
            </Link>
            <Link
              to={`/course/${id}/test/${
                assignmentId ? assignmentId.testId : 0
              }`}
            >
              <ListItem button>
                <Tooltip title="Test">
                  <ListItemIcon>
                    <ExtensionIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText> Test </ListItemText>
              </ListItem>
            </Link>

            <Link to={`/course/${id}/grades`}>
              <ListItem button>
                <Tooltip title="Grades">
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText> Grades </ListItemText>
              </ListItem>
            </Link>

            <Link
              to={`/course/${id}/chatroom?userName=${
                user.firstName
              }&room=${name}`}
            >
              <ListItem button>
                <Tooltip title="Video Classroom">
                  <ListItemIcon>
                    <CastConnectedIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText> Classroom </ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user, assignment}) => {
  return {user, assignment}
}

const mapDispatchToProps = dispatch => {
  return {
    update: (course, id, push) => dispatch(updateCourse(course, id, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
