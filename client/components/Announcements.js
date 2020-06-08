import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import AnnouncementCard from './AnnouncementCard.js'
import CreateAnnouncement from './CreateAnnouncement.js'
import {ThemeProvider, Fab} from '@material-ui/core/'
import theme from './Theme'
import AddIcon from '@material-ui/icons/Add'

class Announcements extends React.Component {
  constructor() {
    super()
    this.state = {
      toggle: false
    }
  }

  render() {
    const {toggle} = this.state
    const {
      course,
      instructor,
      filteredAnnouncements,
      user,
      history
    } = this.props

    if (!course || !instructor || !filteredAnnouncements) {
      return <div>No Announcements</div>
    }
    return (
      <ThemeProvider theme={theme}>
        <div className="course-home-wrapper">
          <Sidebar {...course} instructor={instructor} />
          <div className="course-content">
            <div className="course-content-header">
              <h1>Announcements</h1>
              {user.isTeacher === true && (
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => this.setState({toggle: !toggle})}
                >
                  <AddIcon />
                </Fab>
              )}
            </div>
            <div>
              {toggle && <CreateAnnouncement {...course} {...history} />}
              {filteredAnnouncements.map(announcement => {
                return (
                  <AnnouncementCard key={announcement.id} {...announcement} />
                )
              })}
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = ({courses, teachers, announcements, user}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))

  const instructor = teachers.find(teacher =>
    course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
  )

  const filteredAnnouncements = announcements
    .filter(announcement => announcement.courseId === course.id)
    .reverse()
  return {course, instructor, filteredAnnouncements, user}
}

export default connect(mapStateToProps)(Announcements)
