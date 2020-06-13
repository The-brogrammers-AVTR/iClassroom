import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/styles'
import {removeCourse} from '../store'
import theme from './Theme'

import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    // backgroundColor: theme.palette.secondary.main,
    marginBottom: 50
  },
  media: {
    height: 140
  }
})

const CourseCard = ({
  id,
  name,
  code,
  gradeLevel,
  teachers,
  UserCourses,
  isOpen,
  user,
  remove
}) => {
  const classes = useStyles()

  // const instructor = teachers.find(teacher =>
  //   UserCourses.find(usercourse => usercourse.userId === teacher.id)
  // )
  // const enrolled = UserCourses.some(usercourse => usercourse.userId === user.id)
  // if (!instructor) {
  //   return null
  // }
  const enrolled = true
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://bannerchristian.org/wp-content/uploads/2018/05/banner-education-background.jpg"
            title="Course"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name} - {code}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Instructor: {user.firstName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Grade Level: {gradeLevel}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          {enrolled ? (
            <Link to={`/course/${id}/announcements`}>
              <Button variant="contained" color="primary">
                Enter
              </Button>
            </Link>
          ) : isOpen === true ? (
            <Button color="primary">Join</Button>
          ) : (
            'Closed'
          )}
          {user.isTeacher && (
            <div>
              <IconButton>
                <EditIcon color="primary">Edit Course</EditIcon>
              </IconButton>
              <IconButton onClick={() => remove(id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </Card>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user, teachers}) => {
  return {
    user,
    teachers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove: id => {
      dispatch(removeCourse(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseCard)
