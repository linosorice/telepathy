const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

const withDirname = p => path.join(__dirname, p)

app.use('/css', express.static(withDirname('/css')))
app.use('/js', express.static(withDirname('/js')))
app.use('/assets', express.static(withDirname('/assets')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

server.listen(8081, function () { // Listens to port 8081
  console.log('Listening on ' + server.address().port)
})
