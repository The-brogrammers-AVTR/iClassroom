import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createCourse} from '../store/course'
import {withRouter} from 'react-router-dom'
import {getUserCourses} from '../store'
import {
  ThemeProvider,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Grid,
  Button,
  Paper,
  Typography
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import theme from './Theme'

const useStyles = makeStyles({
  root: {
    margin: theme.spacing(10, 80),
    padding: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
})

const CreateCourse = ({user, save, load, history}) => {
  const [name, setName] = useState('')
  const [code, setCode] = useState(Math.ceil(Math.random() * 4000))
  const [subject, setSubject] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [action, setAction] = useState(false)

  const classes = useStyles()

  const onSubmit = async ev => {
    setAction(!action)
    if (action) {
      console.log('user id', user.id)
      ev.preventDefault()
      try {
        await load()
        await save(
          {
            name: name,
            code: code,
            isOpen: true,
            subject: subject,
            gradeLevel: gradeLevel,
            userId: user.id
          },
          history.push
        )
        setName('')
        setCode(Math.ceil(Math.random() * 4000))
        setAction('')
      } catch (ex) {
        console.log(ex)
      }
    } else {
      setAction(!action)
      ev.preventDefault()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={3}>
        <form>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h5" color="primary">
              Create Course
            </Typography>
            <TextField
              value={name}
              onChange={ev => setName(ev.target.value)}
              label="Name"
            />
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel>Subject</InputLabel>
              <Select onChange={ev => setSubject(ev.target.value)}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Social Studies">Social Studies</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel>Grade Level</InputLabel>
              <Select onChange={ev => setGradeLevel(ev.target.value)}>
                <MenuItem value="Elementary">Elementary</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
                <MenuItem value="Honors">Honors</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon>send</SendIcon>}
              onClick={onSubmit}
              disabled={!name || !subject || !gradeLevel}
            >
              Create
            </Button>
          </Grid>
        </form>
      </Paper>
    </ThemeProvider>
  )
}

const mapStatetoProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProducts = dispatch => {
  return {
    load: () => dispatch(getUserCourses()),
    save: (course, push) => dispatch(createCourse(course, push))
  }
}

export default withRouter(
  connect(mapStatetoProps, mapDispatchToProducts)(CreateCourse)
)
