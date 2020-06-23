import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import Whiteboard from './WhiteBoard.js'
import Chat from './Chat.js'
import Video2 from './video/Video2'

import {ThemeProvider, Fab} from '@material-ui/core/'
import theme from './Theme'
import AddIcon from '@material-ui/icons/Add'

class Live extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {
      course,
      instructor,
      filteredAnnouncements,
      user,
      history
    } = this.props

    if (!course || !instructor || !filteredAnnouncements) {
      return <Sidebar {...course} instructor={instructor} />
    }
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Sidebar {...course} instructor={instructor} />
          <div className="video-whiteboard-wrapper">
            <div className="video-chat-wrapper">
              <Video2 />
              <Chat />
            </div>
            <Whiteboard />
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

export default connect(mapStateToProps)(Live)
