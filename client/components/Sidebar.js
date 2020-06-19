import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {updateCourse} from '../store'
import clsx from 'clsx'
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import theme from './Theme'
import {
  Drawer,
  AppBar,
  Grid,
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
import ContactsIcon from '@material-ui/icons/Contacts'
import AssessmentIcon from '@material-ui/icons/Assessment' //student GPA
import UpdateIcon from '@material-ui/icons/Update' //announcement
import NoteIcon from '@material-ui/icons/Note'
import AssignmentIcon from '@material-ui/icons/Assignment' //assignment
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd' //grade
import SmsIcon from '@material-ui/icons/Sms'
import CastForEducationIcon from '@material-ui/icons/CastForEducation'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {storage} from '../firebase'

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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
})

const Sidebar = ({id, name, code, syllabus, user, instructor, update}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [syllabusFile, setSyllabusFile] = useState(syllabus ? syllabus : '')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const handleChange = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
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
            setSyllabusFile(url)
          })
      }
    )
  }

  const onSubmit = ev => {
    ev.preventDefault()
    console.log('props', history)
    try {
      update(
        {
          syllabus: syllabusFile
        },
        id,
        history.push
      )
    } catch (exception) {
      setError({error: exception.response.data.message})
    }
  }

  useEffect(() => {
    console.log(syllabus)
  }, [])

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
                <IconButton>
                  <ExitToAppIcon />
                </IconButton>
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
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
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
                <progress value={progress} max="100" />{' '}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon />
              <ListItemText>
                <input type="file" onChange={handleChange} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon />
              <ListItemText>
                <button onClick={handleUpload}>Upload</button>
              </ListItemText>
            </ListItem>
            <ListItem>
              <button onClick={onSubmit}>Save</button>
            </ListItem>
            <ListItem>
              <ListItemIcon />
              <ListItemText>
                <a
                  href={syllabusFile}
                  rel="noreferrer"
                  target="_blank"
                  download
                >
                  Syllabus
                </a>
              </ListItemText>
            </ListItem>
            <Divider />
            {user.isTeacher === true && (
              <Link to={`/course/${id}/students`}>
                <ListItem button>
                  <ListItemIcon>
                    <AssignmentIndIcon />
                  </ListItemIcon>
                  <ListItemText> Students </ListItemText>
                </ListItem>
              </Link>
            )}
            <Link to={`/course/${id}/announcements`}>
              <ListItem button>
                <ListItemIcon>
                  <UpdateIcon />
                </ListItemIcon>
                <ListItemText> Announcements </ListItemText>
              </ListItem>
            </Link>
            <Link to={`/course/${id}/lessons`}>
              <ListItem button>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText> Lessons </ListItemText>
              </ListItem>
            </Link>
            <Link to={`/course/${id}/assignments`}>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText> Assignments </ListItemText>
              </ListItem>
            </Link>
            <Link to={`/course/${id}/grades`}>
              <ListItem button>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText> Grades </ListItemText>
              </ListItem>
            </Link>
            <Link
              to={`/course/${id}/chatroom?userName=${
                user.firstName
              }&room=${name}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <CastForEducationIcon />
                </ListItemIcon>
                <ListItemText> White Board </ListItemText>
              </ListItem>
            </Link>
            {/* <Link
              
            >
              <ListItem button>
                <ListItemIcon>
                  <SmsIcon />
                </ListItemIcon>
                <ListItemText> Chat Room </ListItemText>
              </ListItem>
            </Link> */}
          </List>
        </Drawer>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user}) => {
  return {user}
}

const mapDispatchToProps = dispatch => {
  return {
    update: (course, id, push) => dispatch(updateCourse(course, id, push))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
