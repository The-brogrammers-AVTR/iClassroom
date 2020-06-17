import Peer from 'peerjs'
import React, {Component} from 'react'
import {v4} from 'uuid'
const moment = require('moment')
let feedProviderId = v4()
let conn
let peer
import {connect} from 'react-redux'
import VideoTeacher from './VideoTeacher'
import VideoStudent from './VideoStudent'

class Video2 extends Component {
  constructor() {
    super()
    this.state = {
      peer: {},
      peerId: '',
      name: ''
    }
  }

  render() {
    const {user, isTeacher} = this.props
    console.log('user user', user, this.props.user.isTeacher, isTeacher)

    return (
      //
      <div>{isTeacher ? <VideoTeacher /> : <VideoStudent />}</div>
    )
  }
}

const mapState = ({user}) => {
  return {
    isTeacher: !!user.isTeacher,
    user
  }
}
export default connect(mapState)(Video2)
