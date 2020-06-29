import Peer from 'peerjs'
import React, {Component} from 'react'
import {v4} from 'uuid'
const moment = require('moment')
let feedProviderId = v4()
let conn
let peer
import {connect} from 'react-redux'
import VideoTeacher from './VideoTeacher'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient()

import {Tooltip, IconButton, Paper} from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call'
import CallEndIcon from '@material-ui/icons/CallEnd'
import GroupAddIcon from '@material-ui/icons/GroupAdd'

function requestLocalVideo(callbacks) {
  // Monkeypatch for crossbrowser geusermedia
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

  // Request audio an video
  //console.log('navigation video', navigator.getUserMedia)
  navigator.getUserMedia(
    {audio: true, video: true},
    callbacks.success,
    callbacks.error
  )
}

function onReceiveStream(stream, element_id) {
  //console.log('stream from the receiver', stream)
  // Retrieve the video element according to the desired
  let video = document.getElementById(element_id)
  // Set the given stream as the video source
  //console.log(video, element_id)
  video.srcObject = stream //video.src = window.URL.createObjectURL(stream)

  // Store a global reference of the stream
  window.peer_stream = stream
}

class VideoStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputId: ''
    }
    //console.log(props)
    this.connctToPeer = this.connctToPeer.bind(this)
    this.call = this.call.bind(this)
    this.stopStream = this.stopStream.bind(this)
  }

  initialize() {
    return new Peer(feedProviderId)
  }

  //
  call() {
    //console.log('Calling to ' + this.state.peerId)
    //const {peer} = this.state
    //console.log(peer)
    let call = peer.call(
      window.localStorage.getItem('peerId'),
      window.localStream
    )
    //console.log('call', window.localStorage.getItem('peerId'), call)
    call.on('stream', function(stream) {
      //console.log('stream', stream)
      window.peer_stream = stream

      onReceiveStream(stream, 'peer-camera')
    })
  }
  //
  stopStream(videoElement) {
    let elem = document.getElementById(videoElement)
    const stream = elem.srcObject
    const tracks = stream.getTracks()
    tracks.forEach(track => {
      track.stop()
    })
    elem.srcObject = null
  }
  connctToPeer(peerId) {
    const username = this.state.name
    const peer_id = this.state.peerId
    // const {peer} = this.state
    //console.log('conn', peer, peerId)
    if (peerId) {
      conn = peer.connect(peerId, {
        // metadata: {
        //   username: username,
        //   message: this.state.message
        // }
      })
      //console.log('conn conn ', conn)
      conn.on('data', function(data) {
        // console.log('datadata', data)
      })
    } else {
      alert('You need to provide a peer to connect with !')
      return false
    }
    //this.call(conn)
  }

  async componentDidMount() {
    socket.on('teacherPeerId', peerId => {
      window.localStorage.setItem('peerId', peerId)
    })
    const {user} = this.props
    requestLocalVideo({
      success: function(stream) {
        // console.log(stream)
        window.localStream = stream
        //console.log(stream)
        onReceiveStream(stream, 'my-camera')
      },
      error: function(err) {
        //alert('Cannot get access to your camera and video !')
        console.error(err)
      }
    })
    peer = this.initialize()
    if (user.isTeacher) {
      window.localStorage.setItem('peerId', peer.id)
    }
    //console.log(window.localStorage.getItem('peerId'))
    this.setState({peerId: peer.id})
    //console.log('ggghgg', peer)
    this.setState({peer: peer})
    //console.log(this.state.peer)
    peer.on('open', function() {
      //console.log('we are open')
      //document.getElementById('peer-id-label').innerHTML = peer.id
    })
    peer.on('connection', connection => {
      conn = connection
      //console.log('conection.....', connection)
      this.setState({peerId: connection.peer})
      conn.on('data', function(data) {
        // Will print 'hi!'
        //console.log(data)
      })
    })
    peer.on('error', error => {
      console.log('error hapeend' + error)
    })
    peer.on('call', call => {
      //let acceptCall = confirm('do take vcall')
      //if (acceptCall) {
      call.answer(window.localStream)

      call.on('stream', stream => {
        window.peer_stream = stream
        //console.log('stream stream', stream)
        onReceiveStream(stream, 'peer-camera')
      })

      // call.on('close', () => {
      //   console.log('closed')
      // })
      //}
    })
    peer.on('data', function(data) {
      //console.log(data)
    })
    this.connctToPeer(window.localStorage.getItem('peerId'))
    //this.call()
  }

  render() {
    //console.log('video teacher', VideoTeacher.call, this.props)
    return (
      <Paper className="video-wrapper">
        <div className="video-view">
          <video
            id="my-camera"
            width="250"
            height="200"
            autoPlay="autoplay"
            muted="true"
            className="center-block"
          />
          <video
            id="peer-camera"
            width="250"
            height="200"
            autoPlay="autoplay"
            className="center-block"
          />
          {/* <video
          id="rVideo"
          width="300"
          height="300"
          autoPlay="autoplay"
          className="center-block"
        /> */}
        </div>
        <div className="video-header">
          <div className="peer-connection-wrapper">
            <p className="peerID">
              Student ID: {window.localStorage.getItem('peerId')}
            </p>
            <div>
              <input
                value={this.state.inputId}
                placeholder="Peer ID"
                onChange={e => {
                  this.setState({inputId: e.target.value})
                }}
              />
            </div>
          </div>

          <Tooltip title="Connect to Peer">
            <IconButton onClick={() => this.connctToPeer(this.state.inputId)}>
              <GroupAddIcon className="connect" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Call">
            <IconButton onClick={this.call}>
              <CallIcon className="call" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Leave Call">
            <IconButton onClick={() => this.stopStream('my-camera')}>
              <CallEndIcon className="endcall" />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    )
  }
}
const mapState = ({user}) => {
  return {
    isTeacher: !!user.isTeacher,
    user
  }
}
export default connect(mapState)(VideoStudent)
