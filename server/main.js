const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server, {path: '/gamews'})
// const uuidv1 = require('uuid/v1')

// Set of players -- for a later version
// const players = new Set()

// Set of rooms -- for a later version
// const rooms = new Set()

app.use(express.static(path.join(__dirname, '../build/')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

server.listen(8000, function () { // Listens to port 8081
  console.log('Listening on ' + server.address().port)
})

const defaultRoom = 'telepath'

const defaultNamespace = io.of('/')

io.on('connection', socket => {
  // Broadcast coordinates
  socket.on('coords', (coords, i) => {
    // socket.coords = coords
    socket.broadcast.emit('coords', coords, i)
    })

  // Broadcast game over
  defaultNamespace.to('defaultRoom').on('game_over', i => {
    console.log('game_over', i)
    defaultNamespace.to(defaultRoom).emit('game_over', i)
  })

  /* Used in a future version of the game
  socket.on('create_room', () => {
    const roomId = uuidv1() // socket.id //uuidv1()
    rooms.add(roomId)
    socket.join(roomId)
  })
  */

  // Add a player to a room and generate and id
  socket.on('join_room', () => {
    console.log('join_room', defaultRoom)
    socket.join(defaultRoom, () => {
      // The following could have a race condition
      defaultNamespace.to(defaultRoom).clients((err, players) => {
        console.log('players', players)
        if (err) {
          console.error(err)
          return
        }
        const i = players.length - 1
        socket.emit('accepted', i)
        console.log('joined with i:', i)
        if (i === 2) {
          console.log('broadcasting game_ready')
          defaultNamespace.to(defaultRoom).emit('game_ready')
        }
      })
    })
  })

  /* Used in a future version of the game
  socket.on('list_rooms', () => {
    console.log('list_rooms')
    socket.emit('rooms_list', Array.from(rooms))
  })
  */

  /* For the future
  socket.on('list_players', (room = defaultRoom) => {
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
  */

  socket.on('disconnect', err => {
    console.log('socket was', socket.id)
    console.log('disconnect', err)
    defaultNamespace.to(defaultRoom).clients((err, players) => {
      if (err) {
        console.error(err)
        return
      }
      const i = players.findIndex(p => p === socket.id)
      if (i !== -1) {
        console.log('game_over', i)
        defaultNamespace.to(defaultRoom).emit('game_over', 0)
      }
    })
  })
})
