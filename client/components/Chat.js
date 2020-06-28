import React, {Component} from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import socketIOClient from 'socket.io-client'

const location = `${window.location.hostname}:8080`
const socket = socketIOClient.connect() //http://127.0.0.1:8080'
import {Picker} from 'emoji-mart'
//import 'emoji-mart/css/emoji-mart.css'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {IconButton, TextField, Paper} from '@material-ui/core'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded'
import {Label} from 'react-konva'

let DisplayImoji
class Chat extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      user: '',
      emoji: true,
      action: 'message'
    }
    this.submit = this.submit.bind(this)
    this.displayImoji = this.displayImoji.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }
  getUsers() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    socket.emit('joinRoom', {userName, room})
    socket.emit('getUsers', {userName, room})
  }
  componentDidMount() {
    socket.connect()
    console.log(
      'hello from mount',

      this.state.message,
      this.state.emoji
    )
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    this.getUsers()
    //socket.emit('getUsers', {userName, room})
    // socket.emit('joinRoom', {userName, room})
    // socket.emit('getUsers', {userName, room})
    // socket.on('chat message', function(msg) {
    //   console.log(msg)
    //   let mes = document.getElementById('message')
    //   let li = document.createElement('li')
    //   li.innerHTML = msg
    //   mes.appendChild(li)
    //   //console.log(this.state.message)
    // })

    socket.on('message', function(msg) {
      console.log(msg.userName, userName, msg)
      let mes = document.getElementById('message')
      console.log('mes', mes)

      //mes.innerHTML = msg.userName + ' ' + msg.message + ' ' + msg.time
      let html = `<div class="container">
                    <div class="messageUser">
                       <img src="/images/ninja.png" alt="Avatar">
                        <p>${msg.userName}</p>
                    </div>
                    <div class="message-bubble">
                        <p>${msg.message}</p>              
                        <p class="timestamp">${msg.time}</p>
                    </div>
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
  submit(e) {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    console.log('submiting')
    e.preventDefault()
    //socket.emit('joinRoom', {userName, room})
    socket.emit('chat message', this.state.message)
    socket.emit('getUsers', {userName, room})
    //socket.emit('userFinishTyping', 'message')
    this.setState({message: ''})
    // let label = document.getElementById('inputLabel')
    // label.innerText = 'user typing...'
  }

  displayImoji(e) {
    console.log('from emoji')
    e.preventDefault()
    this.setState({emoji: !this.state.emoji})
    console.log(this.state.emoji)
    if (this.state.emoji) {
      DisplayImoji = (
        <Picker
          title="Pick your emoji…"
          emoji="point_up"
          onClick={emoji => {
            console.log(emoji)
            this.setState({message: this.state.message + emoji.native})
          }}
        />
      )
    }
    if (!this.state.emoji) {
      DisplayImoji = ''
    }
  }

  componentWillUnmount() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    socket.emit('disconnect', {userName: userName, room: room})
    console.log('from unmount')
    socket.close()
    this.setState({message: ''})
  }
  render() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    //console.log('this.props message', this.state.message)
    console.log(userName, room, window.location.hostname, location)
    const {user} = this.props

    return (
      <Paper id="chat-wrapper">
        <div id="message-wrapper">
          <div id="displayMessage">
            <div id="message" />
          </div>
          <div id="displayUsers">
            <h3 style={{fontWeight: 'bold', alignText: 'center'}}>
              Online Users
            </h3>
            <div id="users" />
          </div>
        </div>

        <form id="socket" onSubmit={e => this.submit(e)}>
          <div id="chatInput">
            {/* //<Label id="inputLabel" htmlFor="my-input"></Label> */}
            {/* <input
              value={this.state.message}
              id="my-input"
              aria-describedby="my-helper-text"
              onChange={e => {
                this.setState({message: e.target.value})
                socket.emit('userTyping', this.state.message)
              }}
            /> */}
            <TextField
              id="my-input"
              //multiline
              rows={2}
              variant="outlined"
              onChange={e => {
                this.setState({message: e.target.value})
              }}
              value={this.state.message}
              className="textfield"
              size="small"
              // id="my-input"
            />
            <IconButton
              // type="submit"
              variant="contained"
              onClick={this.displayImoji}
              //className={classes.button}
            >
              <EmojiEmotionsRoundedIcon className="emoji" />
            </IconButton>
            <IconButton
              type="submit"
              variant="contained"
              color="primary"
              //className={classes.button}
            >
              <SendRoundedIcon />
            </IconButton>
          </div>
          <div id="emojis">
            {DisplayImoji}
            {/* <Link to="/video">video</Link> */}
          </div>
        </form>
      </Paper>
    )
  }
}

const mapState = ({user}) => {
  return {user}
}

export default withRouter(connect(mapState)(Chat))
