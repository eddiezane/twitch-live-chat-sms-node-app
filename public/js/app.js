'use strict'

const socket = io('/')
let username = null

const inputBox = document.getElementById('message-input')
const usernameBox = document.getElementById('username-input')
const messagesDiv = document.getElementById('messages')
inputBox.style.display = 'none'

socket.on('new message', addNewMessage)

usernameBox.addEventListener('keypress', event => {
  if (event.keyCode == 13) {
    username = event.target.value
    usernameBox.style.display = 'none'
    inputBox.style.display = 'block'
  }
});

inputBox.addEventListener('keypress', event => {
  if (event.keyCode == 13) {
    let message = event.target.value
    let data = { username, message }
    socket.emit('new message', data)
    addNewMessage(data)
    event.target.value = ''
  }
})

function addNewMessage(data) {
  let p = document.createElement('p')
  p.innerText = data.username + ': ' + data.message
  p.className = 'message'
  messagesDiv.insertBefore(p, messagesDiv.children[0])
}
