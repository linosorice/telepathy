import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

import io from 'socket.io-client'

console.log('ciro')
const socket = io('http://localhost:8000', {path: '/gamews', forceNew: true})

socket.on('connect', () => {
  // console.log('socket is:', socket)
  console.log('connected')
})

socket.on('ciro', (socket) => {
  console.log('ciro')
})

// setTimeout(() => { console.log(socket)}, 3000)

socket.emit('create_room')
socket.emit('list_rooms')
socket.on('rooms_list', (rooms) => {
  console.log(rooms)
  const room = rooms[0]
  socket.emit('list_players', room)
  socket.on('players_list', (players) => console.log(players))
})

socket.on('disconnect', () => {
  console.log('disconnected')
})

// socket.emit('disconnect')
class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE)
  }
}

window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
