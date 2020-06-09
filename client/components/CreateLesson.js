import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createLesson} from '../store/lesson'
import {
  IconButton,
  makeStyles,
  Paper,
  TextField,
  ThemeProvider,
  Grid
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import theme from './Theme'

const useStyles = makeStyles({
  root: {
    margin: theme.spacing(2),
    minWidth: theme.spacing(12),
    padding: theme.spacing(2)
  },
  body: {
    minHeight: theme.spacing(5),
    paddingTop: theme.spacing(2)
  }
})

const CreateLesson = ({id, push, post}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const classes = useStyles()

  const onSubmit = ev => {
    ev.preventDefault()
    post(
      {
        title: title,
        description: description,
        courseId: id
      },
      push,
      id
    )
    setTitle('')
    setDescription('')
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={3}>
        <form>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
          />
          <TextField
            fullWidth
            multiline
            className={classes.body}
            rows="2"
            variant="outlined"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />

          <Grid container justify="flex-end" alignItems="center">
            <IconButton onClick={onSubmit} disabled={!title || !description}>
              <SendIcon color="primary" />
            </IconButton>
          </Grid>
        </form>
      </Paper>
    </ThemeProvider>
  )
}

const mapStatetoProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProducts = dispatch => {
  return {
    post: (announcement, push, id) =>
      dispatch(createLesson(announcement, push, id))
  }
}

export default connect(mapStatetoProps, mapDispatchToProducts)(CreateLesson)
