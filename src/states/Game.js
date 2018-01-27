/* globals __DEV__ */
import Phaser from 'phaser'
import Battlefield from './modules/Battlefield'
import Player from '../sprites/Player.js'
import { TILE_SIZE, ROOM_COLS, ROOM_ROWS, BATTLEFIELD_COLS, BATTLEFIELD_ROWS } from '../constants.js'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.player = new Player({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'player'
    })

    let battlefield = new Battlefield(this.game, this.player)
    battlefield.create()

    this.player.addShadow()
    this.game.add.existing(this.player)
    this.game.world.setBounds(-1024, -1024, 1024 + TILE_SIZE * ROOM_COLS * BATTLEFIELD_COLS, 1024 + TILE_SIZE * ROOM_ROWS * BATTLEFIELD_ROWS)
    this.game.camera.follow(this.player)
  }

  render () {
    if (__DEV__) {
      this.game.debug.cameraInfo(this.game.camera, 32, 32)
    }
  }
}
