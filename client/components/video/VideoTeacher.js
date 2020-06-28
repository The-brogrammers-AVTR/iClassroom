import Peer from 'peerjs'
import React, {Component} from 'react'
import {v4} from 'uuid'
const moment = require('moment')
let feedProviderId = v4()
let conn
let peer

import {connect} from 'react-redux'
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
function off(callbacks) {
  // Monkeypatch for crossbrowser geusermedia
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

  // Request audio an video
  //console.log('navigation video', navigator.getUserMedia)
  navigator.getUserMedia(
    {audio: false, video: false},
    callbacks.success,
    callbacks.error
  )
}
function onReceiveStream(stream, element_id) {
  console.log('stream and video', stream, element_id)
  // Retrieve the video element according to the desired
  var video = document.getElementById(element_id)
  // Set the given stream as the video source
  video.srcObject = stream //video.src = window.URL.createObjectURL(stream)
  console.log('stream on')
  // Store a global reference of the stream
  //window.peer_stream = stream
}

class VideoTeacher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputId: '',
      connections: []
    }
    this.connctToPeer = this.connctToPeer.bind(this)
    this.call = this.call.bind(this)
  }

  initialize() {
    return new Peer(feedProviderId)
  }

  //
  call() {
    //console.log('Calling to ' + this.state.peerId)
    const {peer} = this.state
    //console.log(peer)
    let call = peer.call(this.state.peerId, window.localStream)

    call.on('stream', function(stream) {
      //console.log('stream', stream)
      window.peer_stream = stream
      //console.log('window peer_stream')
      onReceiveStream(stream, 'peer-camera-teacher')
    })
  }
  //
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

      conn.on('data', function(data) {
        //console.log('datadata', data)
      })
    } else {
      alert('You need to provide a peer to connect with !')
      return false
    }
  }
  componentWillUnmount() {
    var video = document.getElementById('my-camera')
    video.pause()
    video.src = ''
    localStream.getTracks()[0].stop()
    console.log('Vid off')
  }
  componentDidMount() {
    const {user} = this.props
    requestLocalVideo({
      success: function(stream) {
        console.log(stream)
        window.localStream = stream
        console.log(stream)
        onReceiveStream(stream, 'my-camera')
      },
      error: function(err) {
        alert('Cannot get access to your camera and video !')
        console.error(err)
      }
    })
    peer = this.initialize()
    if (user.isTeacher) {
      window.localStorage.setItem('peerId', peer.id)

      socket.emit('teacherPeerId', peer.id)
    }
    // console.log(window.localStorage.getItem('peerId'))
    this.setState({peerId: peer.id})
    //console.log('ggghgg', peer)
    this.setState({peer: peer})
    //console.log(this.state.peer)
    peer.on('open', function() {
      // console.log('we are open')
      //document.getElementById('peer-id-label').innerHTML = peer.id
    })
    peer.on('connection', connection => {
      conn = connection
      console.log('conection.....', connection)
      // this.setState({peerId: connection.peer})
      conn.on('data', function(data) {
        // Will print 'hi!'
        //console.log(data)
      })
    })
    peer.on('error', error => {
      console.log('error hapeend' + error)
    })
    peer.on('call', call => {
      //console.log('on call teacher', call)
      //let acceptCall = confirm('do take vcall')
      //if (acceptCall) {
      call.answer(window.localStream)

      call.on('stream', stream => {
        window.peer_stream = stream
        console.log('peer peer peer peerr', Object.keys(peer.connections))
        this.setState({connections: Object.keys(peer.connections)})
        console.log('stream stream', stream, call.peer, window.peer_stream)

        onReceiveStream(stream, 'peer-camera-teacher')
      })

      // call.on('close', () => {
      //   console.log('closed')
      // })
      //}
    })
    peer.on('data', function(data) {
      //console.log(data)
    })
  }

  render() {
    console.log('peer peer', peer, this.state.inputId)
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
            id="peer-camera-teacher"
            width="250"
            height="200"
            autoPlay="autoplay"
            className="center-block"
          />
        </div>
        <div className="video-header">
          <p>Teacher</p>
          <p>{window.localStorage.getItem('peerId')}</p>
          <select
            onChange={e => {
              this.setState({inputId: e.target.value})
            }}
          >
            <option>--student ids--</option>
            {this.state.connections.map(p => {
              return <option value={p}>{p}</option>
            })}
          </select>
          <input
            value={this.state.inputId}
            placeholder="peer id"
            onChange={e => {
              this.setState({inputId: e.target.value})
            }}
          />
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
            <IconButton>
              <CallEndIcon className="endcall" />
            </IconButton>
          </Tooltip>
        </div>
        {/* <video
          id="rVideo"
          width="300"
          height="300"
          autoPlay="autoplay"
          className="center-block"
        /> */}
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
export default connect(mapState)(VideoTeacher)
