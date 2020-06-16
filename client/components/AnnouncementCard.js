import React from 'react'
import {connect} from 'react-redux'
import {removeAnnouncement} from '../store'
import {
  IconButton,
  makeStyles,
  Paper,
  Typography,
  ThemeProvider,
  Grid
} from '@material-ui/core'
import theme from './Theme'
import DeleteIcon from '@material-ui/icons/Delete'
const moment = require('moment')

const useStyles = makeStyles({
  root: {
    margin: theme.spacing(2),
    minWidth: theme.spacing(10),
    minHeight: theme.spacing(20),
    backgroundColor: theme.palette.white,
    padding: theme.spacing(3)
  },
  body: {
    minHeight: theme.spacing(10)
  }
})

const AnnouncementCard = ({title, description, id, createdAt, remove}) => {
  const date = moment(createdAt).format('MMMM Do YYYY, h:mm a')
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={3}>
        <Typography variant="h6">{title}</Typography>
        <Typography className={classes.body} variant="body1">
          {description}
        </Typography>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="body2">{date}</Typography>
          <IconButton onClick={() => remove(id)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user}) => {
  return {user}
}

const mapDispatchToProps = dispatch => {
  return {
    remove: id => {
      dispatch(removeAnnouncement(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementCard)
