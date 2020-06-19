import React, {useState, useEffect} from 'react'
// import {withRouter} from 'react-router-dom'
import {storage} from '../firebase'
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
    margin: theme.spacing(5, 53),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    maxWidth: 500
  },
  grid: {
    alignText: 'center'
  },
  button: {
    margin: theme.spacing(2, 20)
  },
  red: {
    color: theme.palette.red
  }
})

// eslint-disable-next-line complexity
const Profile = ({user, update, history}) => {
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ''
  )
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : '')
  const [email, setEmail] = useState(user.email ? user.email : '')
  const [imageURL, setImageURL] = useState(user.imageURL ? user.imageURL : '')
  const [error, setError] = useState('')
  const [edit, setEdit] = useState(false)

  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)

  const classes = useStyles()

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
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
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImageURL(url)
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
        <Typography color="primary" variant="h4">
          User Profile
        </Typography>
        <img className="image" src={imageURL} />
        <IconButton color="primary" onClick={() => setEdit(!edit)}>
          {!edit ? <EditIcon /> : <HighlightOffIcon className={classes.red} />}
        </IconButton>

        {!edit ? (
          <Grid className={classes.grid}>
            <Typography>First Name: {firstName}</Typography>
            <Typography>Last Name: {lastName}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>
              Status: {user.isTeacher ? 'Teacher' : 'Student'}
            </Typography>
          </Grid>
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
            {/* <TextField
              value={imageURL}
              onChange={(event) => setImageURL(event.target.value)}
              label="ImageURL"
            /> */}
            <div>
              <progress value={progress} max="100" />
              <br />
              <br />
              <input type="file" onChange={handleChange} />
              <button onClick={handleUpload}>Upload</button>
              <br />
              {imageURL}
            </div>
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
