'use strict'

const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/inbound/sms', (req, res) => {
  let body = req.body.Body
  io.sockets.emit('new message', { username: 'A Phone', message: body })
  let twiml = `
  <Response>
    <Message>Thanks for texting!</Message>
  </Response>
  `
  res.send(twiml)
})

io.on('connection', socket => {
  socket.on('new message', message => {
    socket.broadcast.emit('new message', message)
  })
})

server.listen(3000, () => console.log('server is started'))
