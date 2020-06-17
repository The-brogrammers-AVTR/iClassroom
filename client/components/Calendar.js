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
import {ThemeProvider} from '@material-ui/styles'
import {makeStyles, Paper} from '@material-ui/core'
import axios from 'axios'
import theme from './Theme'
const moment = require('moment')
const today = moment()

const useStyles = makeStyles({
  table: {
    margin: theme.spacing(10, 0),
    padding: theme.spacing(0),
    width: '95%'
  }
})

// const assignments = [
//   {
//     title: 'Assignment',
//     startDate: '2020-06-01',
//     endDate: '2020-06-02',
//   },
// ]

const Calendar = ({user}) => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`/api/users/${user.id}`)
      .then(res => {
        console.log(res.data.assignments)
        setData(res.data.assignments)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={today.format('YYYY-MM-DD')}
            defaultCurrentViewName="Month"
          />
          <DayView startDayHour={9} endDayHour={18} />
          <WeekView startDayHour={10} endDayHour={19} />
          <MonthView />
          <Appointments />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
        </Scheduler>
      </Paper>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user, users}) => {
  return {
    user,
    users
  }
}

export default connect(mapStateToProps)(Calendar)
