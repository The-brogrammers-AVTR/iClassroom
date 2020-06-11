import * as React from 'react'
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

const useStyles = makeStyles({
  table: {
    margin: theme.spacing(10, 0),
    padding: theme.spacing(0),
    width: '95%'
  }
})

const Calendar = () => {
  const classes = useStyles()
  //   render() {
  //     const {data} = this.state

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Scheduler>
          <ViewState
            defaultCurrentDate="2018-07-27"
            defaultCurrentViewName="Month"
          />
          <DayView startDayHour={9} endDayHour={18} />
          <WeekView startDayHour={10} endDayHour={19} />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
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
