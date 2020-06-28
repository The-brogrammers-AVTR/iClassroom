import React, {useState, useEffect} from 'react'
import {ViewState} from '@devexpress/dx-react-scheduler'
import {connect} from 'react-redux'
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui'
import {makeStyles, Paper, ThemeProvider} from '@material-ui/core'
import axios from 'axios'
import theme from './Theme'
import {setDate} from 'date-fns/esm'
const moment = require('moment')
const today = moment()

const useStyles = makeStyles({
  table: {
    margin: theme.spacing(10, 0),
    padding: theme.spacing(0),
    width: '95%'
  },
  root: {
    backgroundColor: 'aliceblue'
  }
})

const Calendar = ({user, userassignments}) => {
  // console.log('In Cal user', user)
  // console.log('In Cal assign', assignments)
  // console.log('In Cal userassign', userassignments)

  const classes = useStyles()
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    //console.log('in effect', user)
    user.isTeacher
      ? axios
          .get(`/api/users/${user.id}`)
          .then(res => {
            setData(res.data.assignments)
          })
          .catch(err => {
            setError(err.message)
          })
      : setData(
          userassignments
            .filter(userassign => userassign.userId === user.id)
            .map(assign => assign.assignment)
        )
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root}>
        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={today.format('YYYY-MM-DD')}
            defaultCurrentViewName="Month"
          />

          <MonthView />
          <Appointments />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
        </Scheduler>
      </Paper>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(Calendar)
