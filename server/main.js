const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server, {path: '/gamews'})
const uuidv1 = require('uuid/v1')

// Set of players will contain guids
// const players = new Set()

// Set of rooms
const rooms = new Set()

app.use(express.static(path.join(__dirname, '../build/')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

server.listen(8000, function () { // Listens to port 8081
  console.log('Listening on ' + server.address().port)
})

io.on('connection', socket => {
  // socket.emit('allplayers',getAllPlayers())
  // socket.broadcast.emit('newplayer',socket.player)
  io.on('coords', (coords) => {
    // socket.coords = coords
    const roomId = socket.rooms[0]
    socket.to(roomId).emit('coords', {
      coords
    })
  })

  socket.on('create_room', () => {
    console.log('creating room')
    const roomId = uuidv1() // socket.id //uuidv1()
    rooms.add(roomId)
    socket.join(roomId)
  })

  io.on('join_room', (socket, roomId) => {
    socket.join(roomId)
  })

  socket.on('list_rooms', () => {
    console.log('list_rooms')
    socket.emit('rooms_list', Array.from(rooms))
  })

  socket.on('list_players', (room) => {
    console.log('list_players')
    io.of(room).clients((err, players) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('players:', players)
      socket.emit('players_list', players)
    })
  })

  socket.on('disconnect', socket => {
    console.log('disconnect', socket)
  })
})

