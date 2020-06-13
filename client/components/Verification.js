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
  const [value, setValue] = useState(Boolean)
  const [error, setError] = useState('')

  const classes = useStyles()

  const handleChange = event => {
    setValue(event.target.value)
  }

  const onSubmit = ev => {
    ev.preventDefault()

    try {
      update(
        {
          isTeacher: value
        },
        user.id,
        history.push
      )
    } catch (exception) {
      setError(exception.response.data.message)
    }
  }

  useEffect(() => {}, [value])

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
    update: (user, id, push) => {
      dispatch(updateProfile(user, id, push))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification)
