import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import socketIOClient from 'socket.io-client'

const location = `${window.location.hostname}:8080`
const socket = socketIOClient.connect() //http://127.0.0.1:8080'
import {Picker} from 'emoji-mart'
//import 'emoji-mart/css/emoji-mart.css'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {IconButton, TextField} from '@material-ui/core'
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
      imoji: false,
      action: 'message'
    }
    this.submit = this.submit.bind(this)
    this.displayImoji = this.displayImoji.bind(this)
  }

  componentDidMount() {
    console.log('hello from mount', socket)
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    socket.emit('getUsers', {userName, room})
    socket.emit('joinRoom', {userName, room})
    socket.connect()
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
                  <img src="/images/ninja.png" alt="Avatar" className={
                  userName == msg.userName ? 'rigth' : 'rigth'
                  } >
                  <p class="userName">${msg.userName}</p>
                  <h6 class="time-right">${msg.time}</h6>
                  </div>
                  <p>${msg.message}</p>              
                 </div>`
      let li = document.createElement('li')
      li.innerHTML = html
      mes.appendChild(li)
      var chatList = document.getElementById('displayMessage')
      chatList.scrollTop = chatList.scrollHeight
      //console.log(this.state.message)
    })
    socket.on('userTyping', function(msg) {
      //console.log('hello')
      let label = document.getElementById('inputLabel')
      label.innerText = msg + ': ' + 'user is typing'

      // this.setState({action: msg + 'user is typing'})
    })
    socket.on('userFinishTyping', function(msg) {
      console.log('hello')
      let label = document.getElementById('inputLabel')
      label.innerText = 'message'

      // this.setState({action: msg + 'user is typing'})
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
    socket.emit('userFinishTyping', 'message')
    this.setState({message: ''})
    // let label = document.getElementById('inputLabel')
    // label.innerText = 'user typing...'
  }

  displayImoji(e) {
    e.preventDefault()
    this.setState({emoji: !this.state.emoji})
    console.log(this.state.emoji)
    if (this.state.emoji) {
      let button = document.getElementById('buttonEmoji')
      button.innerText = 'Remove Emojis'
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
      let button = document.getElementById('buttonEmoji')
      button.innerText = 'Add Imojis'
      DisplayImoji = ''
    }
  }

  componentWillUnmount() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    socket.emit('disconnect', {userName: userName, room: room})
    console.log('from unmount')
    socket.close()
  }
  render() {
    let userName = queryString.parse(this.props.location.search).userName
    let room = queryString.parse(this.props.location.search).room
    //console.log('this.props message', this.state.message)
    console.log(userName, room, window.location.hostname, location)
    const {user} = this.props

    return (
      <div id="chat-wrapper">
        <div id="message-wrapper">
          <div id="displayMessage">
            <div id="message" />
          </div>
          <div id="displayUsers">
            <span style={{fontWeight: 'bold', alignText: 'center'}}>Users</span>
            <hr />
            <div id="users" />
          </div>
        </div>

        <form id="socket" onSubmit={e => this.submit(e)}>
          <div id="chatInput">
            {/* //<Label id="inputLabel" htmlFor="my-input"></Label> */}
            {/* <Input
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
              multiline
              rows={2}
              variant="outlined"
              onChange={e => {
                this.setState({message: e.target.value})
                socket.emit('userTyping', this.state.message)
              }}
              value={this.state.message}
              className="textfield"
              size="small"
              // id="my-input"
            />
            <IconButton
              type="submit"
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
            {/* <button id="buttonEmoji" onClick={this.displayImoji}>
              Add Emojis
            </button> */}
          </div>
          <div id="emojis">
            {DisplayImoji}
            {/* <Link to="/video">video</Link> */}
            {/* <span>
              <Picker
                onSelect={this.addEmoji}
                title="Pick your emoji…"
                emoji="point_up"
              />
            </span> */}
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
