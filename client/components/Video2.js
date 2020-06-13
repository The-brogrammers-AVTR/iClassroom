import Peer from 'peerjs'
import React, {Component} from 'react'
import {v4} from 'uuid'
const moment = require('moment')
let feedProviderId = v4()

function requestLocalVideo(callbacks) {
  // Monkeypatch for crossbrowser geusermedia
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

  // Request audio an video
  console.log('navigation video', navigator.getUserMedia)
  navigator.getUserMedia(
    {audio: true, video: true},
    callbacks.success,
    callbacks.error
  )
}

function onReceiveStream(stream, element_id) {
  // Retrieve the video element according to the desired
  var video = document.getElementById(element_id)
  // Set the given stream as the video source
  video.srcObject = stream //video.src = window.URL.createObjectURL(stream)

  // Store a global reference of the stream
  window.peer_stream = stream
}

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

export default class Video2 extends Component {
  constructor() {
    super()
    this.state = {
      peer: {},
      peerId: '',
      name: ''
    }
    this.connctToPeer = this.connctToPeer.bind(this)
    this.call = this.call.bind(this)
  }
  initialize() {
    return new Peer(feedProviderId, {debug: 3})
  }

  //document.getElementById("call").addEventListener("click", function(){
  call() {
    console.log('Calling to ' + this.state.peerId)
    const {peer} = this.state
    console.log(peer)
    var call = peer.call(peer_id, window.localStream)

    call.on('stream', function(stream) {
      window.peer_stream = stream

      onReceiveStream(stream, 'peer-camera')
    })
  }
  // document.getElementById("connect-to-peer-btn").addEventListener("click", function(){
  connctToPeer() {
    const username = this.state.name
    const peer_id = this.state.peerId
    const {peer} = this.state
    if (this.state.peerId) {
      conn = peer.connect(peer_id, {
        metadata: {
          username: username
        }
      })

      conn.on('data', handleMessage)
    } else {
      alert('You need to provide a peer to connect with !')
      return false
    }

    document.getElementById('chat').className = ''
    document.getElementById('connection-form').className += ' hidden'
  }

  handleMessage(data) {
    var orientation = 'text-left'

    // If the message is yours, set text to right !
    if (data.from == username) {
      orientation = 'text-right'
    }

    var messageHTML =
      '<a href="javascript:void(0);" class="list-group-item' +
      orientation +
      '">'
    messageHTML += '<h4 class="list-group-item-heading">' + data.from + '</h4>'
    messageHTML += '<p class="list-group-item-text">' + data.text + '</p>'
    messageHTML += '</a>'

    document.getElementById('messages').innerHTML += messageHTML
  }

  componentDidMount() {
    let peer = this.initialize()
    this.setState({peer: peer})
    console.log(this.state.peer)
    peer.on('open', function() {
      document.getElementById('peer-id-label').innerHTML = peer.id
    })
    peer.on('connection', connection => {
      conn = connection
      this.setState({peerId: connection.peer})
    })
    peer.on('error', error => {
      console.log('error hapeend' + error)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            {/* <!-- 
                    Display video of the current user
                    Note: mute your own video, otherwise you'll hear yourself ...
                 --> */}
            <div className="text-center">
              <video
                id="my-camera"
                width="300"
                height="300"
                autoPlay="autoplay"
                muted="true"
                className="center-block"
              />
              <span className="label label-info">You</span>
            </div>
          </div>

          <div className="col-md-6 col-lg-6">
            {/* <!-- Display video of the connected peer --> */}
            <div className="text-center">
              <video
                id="peer-camera"
                width="300"
                height="300"
                autoPlay="autoplay"
                className="center-block"
              />
              <span className="label label-info" id="connected_peer" />
            </div>
          </div>
        </div>

        <div className="row">
          <h1 className="text-center">
            Videochat Example
            <br />
            <small>
              {' '}
              Share the following ID with the pal that wants to talk with you
            </small>
          </h1>
          {/* <!-- The ID of your current session --> */}
          <h4 className="text-center">
            <span id="peer-id-label" />
          </h4>
          <div className="col-md-12 col-lg-12">
            <div className="form-horizontal" id="connection-form">
              <div>
                <legend>Connection Form</legend>
                <div className="form-group">
                  <label htmlFor="name" className="col-lg-2 control-label">
                    Username
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      value={this.state.name}
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Your random username"
                      onChange={e => {
                        this.setState({name: e.target.value})
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="peer_id" className="col-lg-2 control-label">
                    Peer ID (id of your pal)
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.peerId}
                      name="peer_id"
                      id="peer_id"
                      placeholder="Peer ID"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      onChange={e => {
                        this.setState({peerId: e.target.value})
                      }}
                    />

                    {/* <!-- Show message if someone connected to the client --> */}
                    <div id="connected_peer_container" className="hidden">
                      An user is already connected to your session. Just provide
                      a name to connect !
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button
                      id="connect-to-peer-btn"
                      className="btn btn-primary"
                      onClick={this.connctToPeer}
                    >
                      Connect to Peer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div id="chat" className="hidden">
              <div id="messages-container">
                <div className="list-group" id="messages" />
              </div>
              <div id="message-container">
                <div className="form-group">
                  <label className="control-label">Live chat</label>
                  <div className="input-group">
                    <span className="input-group-btn">
                      <button
                        id="call"
                        className="btn btn-info"
                        onClick={this.call}
                      >
                        Call
                      </button>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="message"
                      id="message"
                      placeholder="Your messag here ..."
                    />
                    <span className="input-group-btn">
                      <button id="send-message" className="btn btn-success">
                        Send Message
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
