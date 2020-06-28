import React from 'react'
import {connect} from 'react-redux'
import {authLogin} from '../store'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles
} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Theme'

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
})

const LoginForm = props => {
  const {handleSubmit, error} = props
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          name="login"
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/google" variant="body2">
                Login with Google
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <Box mt={8} />
      </Container>
    </ThemeProvider>
  )
}

const mapStateToProps = state => {
  return {
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authLogin(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
