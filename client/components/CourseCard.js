import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/styles'
import theme from './Theme'

// class CourseCard extends React.Component {
//   constructor() {
//     super()
//   }

//   render() {
//     const {
//       id,
//       name,
//       code,
//       gradeLevel,
//       teachers,
//       UserCourses,
//       isOpen,
//       user,
//     } = this.props
//     const instructor = teachers.find((teacher) =>
//       UserCourses.find((usercourse) => usercourse.userId === teacher.id)
//     )
//     const enrolled = UserCourses.some(
//       (usercourse) => usercourse.userId === user.id
//     )
//     if (!instructor) {
//       return null
//     }
//     return (
//       <li key={id} className="course-card">
//         <h2>
//           {name} - {code}
//         </h2>
//         <p>Instructor: {instructor.firstName}</p>
//         <p>Grade Level: {gradeLevel}</p>

//         {enrolled ? (
//           <Link to={`/course/${id}/announcements`}>Enter</Link>
//         ) : isOpen === true ? (
//           <button className="default-button" type="button">
//             Request to Join
//           </button>
//         ) : (
//           'Closed'
//         )}
//         <br />
//         {user.isTeacher && <button type="button"> Edit Course </button>}
//       </li>
//     )
//   }
// }

import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: 2
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
  user
}) => {
  const classes = useStyles()

  const instructor = teachers.find(teacher =>
    UserCourses.find(usercourse => usercourse.userId === teacher.id)
  )
  const enrolled = UserCourses.some(usercourse => usercourse.userId === user.id)
  if (!instructor) {
    return null
  }

  return (
    <ThemeProvider>
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
          {enrolled ? (
            <Link to={`/course/${id}/announcements`}>
              <Button>Enter</Button>
            </Link>
          ) : isOpen === true ? (
            <Button className="default-button" type="button">
              Request to Join
            </Button>
          ) : (
            'Closed'
          )}
          {user.isTeacher && <Button> Edit Course </Button>}
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

export default connect(mapStateToProps)(CourseCard)
