import React, {Component} from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

const location = `${window.location.hostname}:8080`
const socket = socketIOClient()




import {connect} from 'react-redux'
import queryString from 'query-string'

import {Button, InputLabel, Input} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

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
    socket.emit('getUsers', {userName, room})
    // socket.on('chat message', function(msg) {
    //   console.log(msg)
    //   let mes = document.getElementById('message')
    //   let li = document.createElement('li')
    //   li.innerHTML = msg
    //   mes.appendChild(li)
    //   //console.log(this.state.message)
    // })

    socket.on('message', function(msg) {
      console.log(msg.userName, userName)
      let mes = document.getElementById('message')
      console.log('mes', mes)

      //mes.innerHTML = msg.userName + ' ' + msg.message + ' ' + msg.time
      let html = `<div  style="width:100%;" class="container">
                 <img src="/images/ninja.png" alt="Avatar" style="width:100%;" className={
                 userName == msg.userName ? 'rigth' : 'rigth'
                 } >
                 <p className="userName">USER NAME: -- ${msg.userName} -- </p>
                 <p>${msg.message}</p>
                 <span class="time-right">${msg.time}</span>
                 </div>`
      let li = document.createElement('li')
      li.innerHTML = html
      mes.appendChild(li)
      var chatList = document.getElementById('displayMessage')
      chatList.scrollTop = chatList.scrollHeight
      //console.log(this.state.message)
    })
    // socket.on('joinRoom', function(msg) {
    //   console.log(msg)
    //   let mes = document.getElementsByClassName('message')
    //   console.log('mes', mes)
    //   let li = document.createElement('li')
    //   li.innerHTML = msg.userName + ' ' + msg.message + ' ' + msg.time
    //   mes.appendChild(li)
    //   //console.log(this.state.message)
    // })
    socket.on('getUsers', function(msg) {
      console.log(msg)
      let html = msg.map(user => {
        console.log(user.userName)
        return `<li>${user.userName}</li>`
      })
      console.log(html)
      let users = document.getElementById('users')
      users.innerHTML = html
      // let mes = document.getElementsByClassName('message')
      // console.log('mes', mes)
      // let li = document.createElement('li')
      // li.innerHTML = msg.userName + ' ' + msg.message + ' ' + msg.time
      // mes.appendChild(li)
      //console.log(this.state.message)
    })
  }

  render() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    //
    console.log(userName, room, window.location.hostname, location)
    const {user} = this.props

    return (
      <div id="chatForm">
        <div id="messagesUsers">
          <div id="displayMessage">
            <div id="message" />
          </div>
          <div id="displayUsers">
            <span style={{textDecoration: 'underline', fontWeight: 'bold'}}>
              Users
            </span>
            <hr />
            <div id="users" />
          </div>
        </div>

        <form
          id="socket"
          onSubmit={e => {
            console.log('submiting')
            e.preventDefault()
            socket.emit('joinRoom', {userName, room})
            socket.emit('chat message', this.state.message)
            socket.emit('getUsers', {userName, room})

            //this.a()
            this.setState({message: ''})
          }}
        >
          <div id="chatInput">
            <InputLabel htmlFor="my-input">message</InputLabel>
            <Input
              value={this.state.message}
              id="my-input"
              aria-describedby="my-helper-text"
              onChange={e => {
                this.setState({message: e.target.value})
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              //className={classes.button}
              endIcon={<Icon>send</Icon>}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = ({user}) => {
  return {user}
}

export default connect(mapState)(Chat)
