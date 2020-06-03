import React, {Component} from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
var socket = socketIOClient('http://127.0.0.1:8080')
import {connect} from 'react-redux'
import queryString from 'query-string'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      user: ''
    }
  }
  componentDidMount() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    //socket.emit('joinRoom', {userName, room})
    socket.on('chat message', function(msg) {
      console.log(msg)
      let mes = document.getElementById('message')
      let li = document.createElement('li')
      li.innerHTML = msg
      mes.appendChild(li)
      //console.log(this.state.message)
    })
    socket.on('message', function(msg) {
      console.log(msg)
      let mes = document.getElementById('message')
      let li = document.createElement('li')
      li.innerHTML = msg.userName + ' ' + msg.message + ' ' + msg.time
      mes.appendChild(li)
      //console.log(this.state.message)
    })
    socket.on('joinRoom', function(msg) {
      console.log(msg)
      let mes = document.getElementById('message')
      let li = document.createElement('li')
      li.innerHTML = msg.userName + ' ' + msg.message + ' ' + msg.time
      mes.appendChild(li)
      //console.log(this.state.message)
    })
  }

  render() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    //
    console.log(userName, room)
    const {user} = this.props

    return (
      <div>
        <ul id="message" />
        <form
          id="socket"
          onSubmit={e => {
            e.preventDefault()
            socket.emit('joinRoom', {userName, room})
            socket.emit('chat message', this.state.message)

            //this.a()
            this.setState({message: ''})
          }}
        >
          <input
            id="m"
            value={this.state.message}
            onChange={e => {
              this.setState({message: e.target.value})
            }}
          />
          <button onClick={() => {}}>Send</button>
          <button>hello</button>
        </form>
      </div>
    )
  }
}

const mapState = ({user}) => {
  return {user}
}

export default connect(mapState)(Chat)
