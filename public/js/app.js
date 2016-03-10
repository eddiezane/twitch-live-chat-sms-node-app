'use strict'

const socket = io('/')

const inputBox = document.getElementById('message-input')
const messagesDiv = document.getElementById('messages')

socket.on('new message', addNewMessage)

inputBox.addEventListener('keypress', event => {
  if (event.keyCode == 13) {
    let message = event.target.value
    socket.emit('new message', message)
    addNewMessage(message)
    event.target.value = ''
  }
})

function addNewMessage(message) {
  let p = document.createElement('p')
  p.innerText = message
  p.className = 'message'
  messagesDiv.insertBefore(p, messagesDiv.children[0])
}
