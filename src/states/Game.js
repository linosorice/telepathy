/* globals __DEV__ */
import Phaser from 'phaser'
import Battlefield from './modules/Battlefield'
import Player from '../sprites/Player.js'
import Torch from '../sprites/Torch'

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
    this.game.world.setBounds(-this.game.width / 2, -this.game.height / 2, this.game.width * 2, this.game.height * 2)
    this.game.camera.follow(this.player)

    this.torch = new Torch({
      game: this.game,
      player: this.player
    })
    this.game.add.existing(this.torch)
  }

  render () {
    if (__DEV__) {
      this.game.debug.cameraInfo(this.game.camera, 32, 32)
    }
  }
}
