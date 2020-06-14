import React, {useState} from 'react'
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

export const appointments = [
  {
    title: 'Assignment',
    startDate: new Date(2020, 6, 28),
    endDate: new Date(2020, 6, 29)
  },
  {
    title: 'Assignment',
    startDate: new Date(2020, 6, 28),
    endDate: new Date(2020, 6, 29)
  }
]

const Calendar = () => {
  const classes = useStyles()
  const [data, setData] = useState(appointments)

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

const mapStateToProps = ({user, teachers}) => {
  return {
    user,
    teachers
  }
}

export default connect(mapStateToProps)(Calendar)
