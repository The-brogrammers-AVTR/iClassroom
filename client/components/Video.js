import Peer from 'peerjs'
import React, {Component} from 'react'
import {v4} from 'uuid'
const moment = require('moment')
let feedProviderId = v4()

/**
 * Create the connection between the two Peers.
 *
 * Sets up callbacks that handle any events related to the
 * connection and data received on it.
 */
var lastPeerId = null
var peer = null // own peer object
var conn = null

var cueString = '<span class="cueMsg">Cue: </span>'
export default class Video extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      roomId: ''
    }
    this.join = this.join.bind(this)
    this.send = this.send.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.getUrlParam = this.getUrlParam.bind(this)
  }

  /**
   * Create the Peer object for our end of the connection.
   *
   * Sets up callbacks that handle any events related to our
   * peer object.
   */
  initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer(null, {
      debug: 3
    })

    peer.on('open', function(id) {
      // Workaround for peer.reconnect deleting previous id
      if (peer.id === null) {
        console.log('Received null id from peer open')
        peer.id = lastPeerId
      } else {
        lastPeerId = peer.id
      }

      console.log('ID: ' + peer.id)
    })
    peer.on('connection', function(c) {
      // Disallow incoming connections
      c.on('open', function() {
        c.send('Sender does not accept incoming connections')
        setTimeout(function() {
          c.close()
        }, 500)
      })
    })
    peer.on('disconnected', function() {
      status.innerHTML = 'Connection lost. Please reconnect'
      console.log('Connection lost. Please reconnect')

      // Workaround for peer.reconnect deleting previous id
      peer.id = lastPeerId
      peer._lastServerId = lastPeerId
      peer.reconnect()
    })
    peer.on('close', function() {
      conn = null
      status.innerHTML = 'Connection destroyed. Please refresh'
      console.log('Connection destroyed')
    })
    peer.on('error', function(err) {
      console.log(err)
      alert('' + err)
    })
  }

  /**
   * Create the connection between the two Peers.
   *
   * Sets up callbacks that handle any events related to the
   * connection and data received on it.
   */
  join() {
    // Close old connection
    if (conn) {
      conn.close()
    }
    console.log(this.state, 'from 99 join func')
    // Create connection to destination peer specified in the input field
    conn = peer.connect(this.state.roomId, {
      reliable: true
    })
    console.log(conn, 'from 99 join func', conn.peer)
    conn.on('open', function() {
      document.getElementById('status').innerHTML = 'Connected to: ' + conn.peer
      console.log('Connected to: ' + conn.peer)

      // Check URL params for comamnds that should be sent immediately
      //   var command = this.getUrlParam('command')
      //   if (command) conn.send(command)
    })
    // Handle incoming data (messages only since this is the signal sender)
    conn.on('data', function(data) {
      console.log('adding message', data)
      addMessage(data) //this.addMessage('<span class="peerMsg">Peer:</span> ' + data)
    })
    conn.on('close', function() {
      document.getElementById('status').innerHTML = 'Connection closed'
    })
  }

  /**
   * Get first "GET style" parameter from href.
   * This enables delivering an initial command upon page load.
   *
   * Would have been easier to use location.hash.
   */
  getUrlParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    var regexS = '[\\?&]' + name + '=([^&#]*)'
    var regex = new RegExp(regexS)
    var results = regex.exec(window.location.href)
    if (results == null) return null
    else return results[1]
  }

  /**
   * Send a signal via the peer connection and add it to the log.
   * This will only occur if the connection is still alive.
   */
  signal(sigName) {
    if (conn && conn.open) {
      conn.send(sigName)
      console.log(sigName + ' signal sent')
      addMessage(cueString + sigName)
    } else {
      console.log('Connection is closed')
    }
  }

  //   goButton.addEventListener('click', function() {
  //     signal('Go')
  //   })
  //   resetButton.addEventListener('click', function() {
  //     signal('Reset')
  //   })
  //   fadeButton.addEventListener('click', function() {
  //     signal('Fade')
  //   })
  //   offButton.addEventListener('click', function() {
  //     signal('Off')
  //   })

  addMessage(msg) {
    console.log('in message', msg)
    let time = moment().format('hh:mm a')

    document.getElementById('message').innerHTML =
      '<br><span className="msg-time">' +
      time +
      '</span>  -  ' +
      msg +
      document.getElementById('message').innerHTML
  }

  clearMessages() {
    //message.innerHTML = ''
    addMessage('Msgs cleared')
  }

  // Listen for enter in message box
  //   sendMessageBox.addEventListener('keypress', function(e) {
  //     var event = e || window.event
  //     var char = event.which || event.keyCode
  //     if (char == '13') sendButton.click()
  //   })
  //Send message

  send() {
    console.log(conn)
    if (conn) {
      var msg = this.state.message
      this.setState({message: ''})
      conn.send(msg)
      console.log('Sent: ' + msg)
      this.addMessage('<span className="selfMsg">Self: </span> ' + msg)
    } else {
      console.log('Connection is closed')
    }
  }
  // Clear messages box
  //clearMsgsButton.addEventListener('click', clearMessages)
  //   // Start peer connection on click
  //connectButton.addEventListener('click', join)

  // Since all our callbacks are setup, start the process of obtaining an ID

  componentDidMount() {
    this.initialize()
  }
  render() {
    console.log(peer)
    return (
      <div>
        <h1>Peer-to-Peer Cue System --- Sender</h1>

        <table className="control">
          <tr>
            <td className="title">Status:</td>
            <td className="title">Messages:</td>
          </tr>
          <tr>
            <td>
              <span style={{fontWeight: 'bold'}}>ID: </span>

              <input
                value={this.state.roomId}
                type="text"
                id="receiver-id"
                title="Input the ID from receive.html"
                onChange={e => {
                  console.log(e.target.value)
                  this.setState({roomId: e.target.value})
                }}
              />
              <button id="connect-button" onClick={this.join}>
                Connect
              </button>
            </td>
            <td>
              <input
                value={this.state.message}
                type="text"
                id="sendMessageBox"
                placeholder="Enter a message..."
                //autofocus="true"
                onChange={e => {
                  this.setState({message: e.target.value})
                }}
              />
              <button type="button" id="sendButton" onClick={this.send()}>
                Send
              </button>
              <button
                type="button"
                id="clearMsgsButton"
                onClick={this.clearMessages}
              >
                Clear Msgs (Local)
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div id="status" className="status" />
            </td>
            <td>
              <div className="message" id="message" />
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" className="control-button" id="resetButton">
                Reset
              </button>
            </td>
            <td>
              <button type="button" className="control-button" id="goButton">
                Go
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" className="control-button" id="fadeButton">
                Fade
              </button>
            </td>
            <td>
              <button type="button" className="control-button" id="offButton">
                Off
              </button>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}
