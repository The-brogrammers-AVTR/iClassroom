import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/styles'
import {removeCourse, joinUserCourse} from '../store'
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
  IconButton,
  Tooltip
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  root: {
    minWidth: 400,
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
  remove,
  join
}) => {
  const classes = useStyles()
  let instructor, enrolled, pending
  const userId = user.id
  console.log('CourseCard userid:', userId)
  if (UserCourses && teachers) {
    instructor = teachers.find(teacher =>
      UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )
    enrolled = UserCourses.some(usercourse => usercourse.userId === user.id)
    pending = UserCourses.some(
      usercourse => usercourse.userId === user.id && usercourse.admit === false
    )
  }
  if (!instructor) {
    return null
  }
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
              Instructor: {instructor.firstName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Grade Level: {gradeLevel}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          {pending ? (
            'Pending'
          ) : enrolled ? (
            <Link to={`/course/${id}/announcements`}>
              <Button variant="contained" color="primary">
                Enter
              </Button>
            </Link>
          ) : isOpen === true ? (
            <Button color="primary" onClick={() => join(id, user.id)}>
              Join
            </Button>
          ) : (
            'Closed'
          )}
          {user.isTeacher && (
            <div>
              <Tooltip title="Delete">
                <IconButton onClick={() => remove(id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
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
    },
    join: (courseId, userId) => {
      console.log('mapDispatch -- join', courseId, userId)
      dispatch(joinUserCourse(courseId, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseCard)
