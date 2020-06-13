import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateProfile} from '../store'

import {
  Backdrop,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button
} from '@material-ui/core/'
import {ThemeProvider, makeStyles} from '@material-ui/styles/'
import theme from './Theme'

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.white,
    padding: theme.spacing(5)
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000'
  }
})

const Verification = ({user, update, history}) => {
  const [value, setValue] = useState(null)
  const [error, setError] = useState('')

  const classes = useStyles()

  const handleChange = event => {
    setValue(event.target.value)
    console.log({onChange: value})
  }

  const onSubmit = ev => {
    ev.preventDefault()
    console.log({value})
    try {
      update(
        {
          isTeacher: value,
          firstName: 'Tyler'
        },
        user.id,
        history.push
      )
    } catch (exception) {
      setError(exception.response.data.message)
    }
    console.log(user.isTeacher, user.firstName)
  }

  useEffect(
    () => {
      console.log({useEffect: value})
      console.log(user.isTeacher)
    },
    [value]
  )

  return (
    <ThemeProvider theme={theme}>
      <Backdrop className={classes.backdrop} open>
        <FormControl className={classes.paper}>
          <FormLabel>Are you a teacher?</FormLabel>
          <RadioGroup name="isTeacher" value={value} onChange={handleChange}>
            <Grid>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </Grid>
            <Button onClick={onSubmit}> Submit</Button>
          </RadioGroup>
        </FormControl>
      </Backdrop>
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

export default connect(mapStateToProps, mapDispatchToProps)(Verification)
