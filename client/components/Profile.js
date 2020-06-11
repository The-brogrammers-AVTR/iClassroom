import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateProfile} from '../store'
import {
  IconButton,
  Button,
  TextField,
  makeStyles,
  Paper,
  Typography,
  ThemeProvider,
  Grid
} from '@material-ui/core'
import theme from './Theme'
import EditIcon from '@material-ui/icons/Edit'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles({
  paper: {
    margin: theme.spacing(10, 53),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    maxWidth: 500
  },
  button: {
    width: 100
  }
})

// eslint-disable-next-line complexity
const Profile = ({user, update}) => {
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ''
  )
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : '')
  const [email, setEmail] = useState(user.email ? user.email : '')
  const [imageURL, setImageURL] = useState(user.imageURL ? user.imageURL : '')
  const [error, setError] = useState('')
  const [edit, setEdit] = useState(false)

  const classes = useStyles()

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
    setEdit(!edit)
  }
  useEffect(
    () => {
      console.log(firstName, lastName, email, imageURL)
    },
    [firstName, lastName, email, imageURL]
  )

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        <Typography variant="h4">User Profile</Typography>
        <img src={imageURL} />
        <IconButton onClick={() => setEdit(!edit)}>
          {!edit ? <EditIcon /> : <HighlightOffIcon />}
        </IconButton>

        {!edit ? (
          <div>
            <Typography>First Name: {firstName}</Typography>
            <Typography>Last Name: {lastName}</Typography>
            <Typography>Email: {email}</Typography>
          </div>
        ) : (
          <Grid container display="flex" direction="column">
            <TextField
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              label="First Name"
            />
            <TextField
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              label="Last Name"
            />
            <TextField
              value={email}
              onChange={event => setEmail(event.target.value)}
              label="Email"
            />
            <TextField
              value={imageURL}
              onChange={event => setImageURL(event.target.value)}
              label="ImageURL"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="small"
              onClick={onSubmit}
              disabled={
                firstName === user.firstName &&
                lastName === user.lastName &&
                email === user.email &&
                imageURL === user.imageURL
              }
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        )}
      </Paper>
    </ThemeProvider>
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
