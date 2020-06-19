import React, {useState} from 'react'
import {connect} from 'react-redux'
import MyCourses from './MyCourses'
import FindCourses from './FindCourses'
import Calendar from './Calendar'

import SwipeableViews from 'react-swipeable-views'
import {
  makeStyles,
  ThemeProvider,
  Tabs,
  Tab,
  Typography,
  Box
} from '@material-ui/core/'
import theme from './Theme'

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.white,
    position: 'relative'
  }
})

const TabPanel = props => {
  const {children, value, index, ...other} = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const Home = props => {
  //console.log(props)
  const userassignments = props.userassignment
  const [value, setValue] = useState(0)

  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="My Courses" />
          <Tab label="Find Courses" />
          <Tab label="Class Calendar" />
          <Tab label="Report Card" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <MyCourses />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <FindCourses />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Calendar userassignments={userassignments} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            Report Card
          </TabPanel>
        </SwipeableViews>
      </div>
    </ThemeProvider>
  )
}

// const mapStateToProps = ({user, assignments, userassignments}) => {
//   console.log('user', user)
//   //console.log('map', assignments)
//   return {user, assignments, userassignments}
// }

const mapStateToProps = ({userassignment, user}, {match}) => {
  if (!userassignment) {
    return {}
  }
  return {
    user,
    userassignment
  }
}

export default connect(mapStateToProps)(Home)
